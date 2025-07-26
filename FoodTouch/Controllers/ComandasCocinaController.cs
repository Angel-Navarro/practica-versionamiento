using FoodTouch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodTouch.Controllers
{
    public class ComandasCocinaController : Controller
    {
        // GET: ComandasCocinaController
        public ActionResult Index()
        {
            var platillosPrecio = Cat_Platillos.ObtenerPlatillosPrecio();

            string dia = DateTime.Now.ToString("yyyy-MM-dd");

            //Obtener todas las comandas
            var listaComandas = Comandas.ObtenerComandas(dia);

            ViewBag.platillosPrecio = platillosPrecio;
            ViewBag.listaComandas = listaComandas;

            // Enviar a la vista
            return View();
            return View();
        }

        // GET: ComandasCocinaController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ComandasCocinaController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ComandasCocinaController/Create
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

        // GET: ComandasCocinaController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ComandasCocinaController/Edit/5
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

        // GET: ComandasCocinaController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ComandasCocinaController/Delete/5
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
    }
}
