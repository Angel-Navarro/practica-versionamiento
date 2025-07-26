using FoodTouch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodTouch.Controllers
{
    public class ComandasMeserosController : Controller
    {
        // GET: ComandasMeserosController
        public ActionResult Index()
        {
            //Llenar combo con lo de la base ed datos
            var platillos = Cat_Platillos.ObtenerPlatillosCombo();
            var platillosPrecio = Cat_Platillos.ObtenerPlatillosPrecio();

            string dia = DateTime.Now.ToString("yyyy-MM-dd");

            //Obtener todas las comandas
            var listaComandas = Comandas.ObtenerComandas(dia);

            ViewBag.platillos = platillos;
            ViewBag.platillosPrecio = platillosPrecio;
            ViewBag.listaComandas = listaComandas;

            // Enviar a la vista
            return View();
        }

        // GET: ComandasMeserosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ComandasMeserosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ComandasMeserosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ComandasMeserosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ComandasMeserosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ComandasMeserosController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ComandasMeserosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        #region Metodos

        #region Agregar
        [HttpPost]
        public string AgregarNuevaComanda()
        {
            try
            {
                // Obtener datos básicos de la comanda desde el FormData
                string mesa = Request.Form["mesa"];

                // Obtener el ID del usuario autenticado
                string idMesero = User.FindFirstValue("ID");

                string totalStr = Request.Form["total"];
                string fechaStr = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                string cantidadPlatillosStr = Request.Form["cantidadPlatillos"];

                // Validaciones básicas
                if (string.IsNullOrEmpty(mesa))
                {
                    return "ERROR: Mesa requerida";
                }

                if (!decimal.TryParse(totalStr, out decimal total))
                {
                    return "ERROR: Total inválido";
                }

                if (!int.TryParse(cantidadPlatillosStr, out int cantidadPlatillos))
                {
                    return "ERROR: Cantidad de platillos inválida";
                }

                int idUs = int.Parse(User.FindFirstValue("ID"));
                string nomUs = User.FindFirstValue("nombre");

                // Crear objeto comanda
                Comandas nuevaComanda = new Comandas
                {
                    idUsuario = idUs,
                    usuarioNombre = nomUs,
                    mesa = mesa,
                    fechaHora = fechaStr,
                    estado = "pending", // o el estado inicial que manejes
                    notas = Request.Form["notas"].ToString() ?? "",
                    listaPlatillos = new List<Comandas_Platillos>()
                };

                // Procesar platillos desde el FormData
                for (int i = 0; i < cantidadPlatillos; i++)
                {
                    string platilloIdStr = Request.Form[$"platillo_{i}_id"];
                    string platilloNombre = Request.Form[$"platillo_{i}_nombre"];
                    string tamano = Request.Form[$"platillo_{i}_tamano"];
                    string cantidadStr = Request.Form[$"platillo_{i}_cantidad"];
                    string precioUnitarioStr = Request.Form[$"platillo_{i}_precioUnitario"];
                    string precioTotalStr = Request.Form[$"platillo_{i}_precioTotal"];
                    string notas = Request.Form[$"platillo_{i}_notas"];
                    string estado = Request.Form[$"platillo_{i}_estado"];

                    // Validar y convertir datos del platillo
                    if (int.TryParse(platilloIdStr, out int platilloId) &&
                        int.TryParse(cantidadStr, out int cantidad) &&
                        decimal.TryParse(precioUnitarioStr, out decimal precioUnitario) &&
                        decimal.TryParse(precioTotalStr, out decimal precioTotal))
                    {
                        Comandas_Platillos platillo = new Comandas_Platillos
                        {
                            idComanda = 0, // Se asignará automáticamente en el modelo
                            idPlatillo = platilloId,
                            nombrePlatillo = platilloNombre,
                            cantidad = cantidad,
                            precioTotal = precioTotal,
                            tamano = tamano ?? "CHICO",
                            notas = notas ?? "",
                            estado = estado ?? "pending"
                        };

                        nuevaComanda.listaPlatillos.Add(platillo);
                    }
                }

                // Validar que tenga al menos un platillo
                if (nuevaComanda.listaPlatillos.Count == 0)
                {
                    return "ERROR: Debe agregar al menos un platillo";
                }

                // Llamar al método del modelo para guardar la comanda
                string resultado = Comandas.AgregarComanda(nuevaComanda);

                return resultado; // Retorna "OK" o "ERROR"
            }
            catch (Exception ex)
            {
                // Log del error para debugging
                Console.WriteLine($"Error en AgregarNuevaComanda: {ex.Message}");
                return "ERROR: " + ex.Message;
            }
        }

        // Método auxiliar para obtener el ID del usuario actual
        // Debes implementar esto según tu sistema de autenticación
        private int ObtenerIdUsuarioActual()
        {
            // Obtener el ID del usuario autenticado
            int idMesero = int.Parse(User.FindFirstValue("ID"));
            return idMesero;
        }

        // Versión alternativa si prefieres recibir JSON
        [HttpPost]
        public string AgregarNuevaComandaJSON()
        {
            try
            {
                string comandaDataJson = Request.Form["comandaData"];

                if (string.IsNullOrEmpty(comandaDataJson))
                {
                    return "ERROR: Datos de comanda requeridos";
                }

                // Deserializar el JSON (necesitarás using Newtonsoft.Json; o System.Text.Json)
                dynamic comandaData = Newtonsoft.Json.JsonConvert.DeserializeObject(comandaDataJson);

                Comandas nuevaComanda = new Comandas
                {
                    idUsuario = ObtenerIdUsuarioActual(),
                    mesa = comandaData.mesa,
                    estado = "pending",
                    notas = comandaData.notas?.ToString() ?? "",
                    listaPlatillos = new List<Comandas_Platillos>()
                };

                // Procesar platillos del JSON
                foreach (var platilloData in comandaData.platillos)
                {
                    Comandas_Platillos platillo = new Comandas_Platillos
                    {
                        idPlatillo = (int)platilloData.id,
                        cantidad = (int)platilloData.cantidad,
                        precioTotal = (decimal)platilloData.precioTotal,
                        tamano = platilloData.tamano?.ToString() ?? "CHICO",
                        notas = platilloData.notas?.ToString() ?? "",
                        estado = platilloData.estado?.ToString() ?? "pending"
                    };

                    nuevaComanda.listaPlatillos.Add(platillo);
                }

                string resultado = Comandas.AgregarComanda(nuevaComanda);
                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en AgregarNuevaComandaJSON: {ex.Message}");
                return "ERROR: " + ex.Message;
            }
        }
        #endregion

        #region Obtener
        [HttpGet]
        public List<Comandas> ObtenerComandasDependeDia(string fecha)
        {
            // Validar fecha
            if (string.IsNullOrEmpty(fecha))
            {
                fecha = DateTime.Now.ToString("yyyy-MM-dd");
            }

            return Comandas.ObtenerComandas(fecha);
        }
        #endregion

        #endregion
    }
}
