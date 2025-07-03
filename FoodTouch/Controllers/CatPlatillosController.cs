using FoodTouch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

//Cookies
using Microsoft.AspNetCore.Authorization;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace FoodTouch.Controllers
{
    [Authorize]
    public class CatPlatillosController : Controller
    {
        private readonly ILogger<CatPlatillosController> _logger;

        public CatPlatillosController(ILogger<CatPlatillosController> logger)
        {
            _logger = logger;
        }

        [Authorize(Roles = "Administrador")]
        // GET: CatPlatilloController
        public ActionResult Index()
        {
            //Llenar botones con lo de la base ed datos
            var categorias = Cat_Categorias_Platillos.ObtenerCategoriasCombo();
            return View(categorias);

        }

        //Vista de botones de las categorias
        public IActionResult CatPlatillosCrud(int id, string nombre)
        {
            ViewBag.id = id;
            ViewBag.nombre = nombre;

            string idMandar = id.ToString();

            // Traer todos los platillos (sin filtrar categoría: "0")
            var listaPlatillos = Cat_Platillos.ObtenerPlatillos(idMandar);

            // Enviar a la vista
            return View(listaPlatillos);
        }


        // GET: CatPlatilloController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CatPlatilloController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CatPlatilloController/Create
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

        // GET: CatPlatilloController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CatPlatilloController/Edit/5
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

        // GET: CatPlatilloController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CatPlatilloController/Delete/5
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

        #region Metodos de la clase

        [HttpPost]
        public string AgregarPlatillo(string nombre, string descripcion, string precioG, string precioCH, string idCategoria, string estatus, IFormFile imagen)
        {

            byte[] imagenBytes = null;

            if (imagen != null && imagen.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    imagen.CopyTo(ms);
                    imagenBytes = ms.ToArray(); // convertimos la imagen a arreglo de bytes
                }
            }


            Cat_Platillos platillo = new Cat_Platillos();
            platillo.nombre = nombre;
            platillo.descripcion = descripcion;
            platillo.precioG = precioG;
            platillo.precioCH = precioCH;
            platillo.idCategoria = idCategoria;
            platillo.estatus = estatus;
            platillo.imagen = imagenBytes;


            // Llama al metodo EnviarCorreo desde la instancia creada
            return Cat_Platillos.AgregarPlatillo(platillo);
        }
        [HttpPost]
        public string ModificarPlatillo(string nombre, string descripcion, string precioG, string precioCH, string id, string estatus, string imagenBase64)
        {
            Cat_Platillos platillo = new Cat_Platillos();
            platillo.ID = int.Parse(id);
            platillo.nombre = nombre;
            platillo.descripcion = descripcion;
            platillo.precioG = precioG;
            platillo.precioCH = precioCH;
            platillo.estatus = estatus;
            platillo.imagenBase64 = imagenBase64;

            // Quitar "data:image/jpeg;base64," y convertir a byte[]
            if (!string.IsNullOrEmpty(imagenBase64) && imagenBase64.StartsWith("data"))
            {
                string base64Data = imagenBase64.Substring(imagenBase64.IndexOf(",") + 1);
                platillo.imagen = Convert.FromBase64String(base64Data);
            }


            return Cat_Platillos.ModificarPlatillo(platillo);
        }
        [HttpPost]
        public List<Cat_Platillos> ObtenerPlatillos(string idCategoria)
        {
            return Cat_Platillos.ObtenerPlatillos(idCategoria);
        }

        #endregion
    }
}
