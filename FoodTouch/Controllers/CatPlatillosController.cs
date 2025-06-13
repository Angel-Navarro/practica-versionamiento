using FoodTouch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FoodTouch.Controllers
{
    public class CatPlatillosController : Controller
    {
        // GET: CatPlatilloController
        public ActionResult Index()
        {
            //Llenar combo box con lo de la base ed datos
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

        [HttpPost]
        public string AgregarPlatillo(string nombre, string descricpion, string precioG, string precioCH, string idCategoria, string estatus)
        {
            Cat_Platillos platillo = new Cat_Platillos();
            platillo.nombre = nombre;
            platillo.descripcion = descricpion;
            platillo.precioG = precioG;
            platillo.precioCH = precioCH;
            platillo.idCategoria = idCategoria;
            platillo.estatus = estatus;
            // Llama al m�todo EnviarCorreo desde la instancia creada
            return Cat_Platillos.AgregarPlatillo(platillo);
        }
    }
}
