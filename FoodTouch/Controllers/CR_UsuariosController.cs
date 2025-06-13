//Código de Angel Navarro (Controller de CrudUsuarios)
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodTouch.Controllers
{
    public class CR_UsuariosController : Controller
    {
        // GET: CR_UsuariosController
        public ActionResult Index()
        {
            return View();
        }

        // GET: CR_UsuariosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CR_UsuariosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CR_UsuariosController/Create
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

        // GET: CR_UsuariosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CR_UsuariosController/Edit/5
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

        // GET: CR_UsuariosController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CR_UsuariosController/Delete/5
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


        //[HttpPost]
        //public string GuardarUsuario(string nombre, string correo, string rol)
        //{


        //    // Llama al m�todo EnviarCorreo desde la instancia creada
        //    return Home.EnviarCorreo(correo, cuerpo);
        //}


    }
}
