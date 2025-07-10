//Código de Angel Navarro (Controller de Home, permisos y accesos)
using System.Diagnostics;
using FoodTouch.Models;
using Microsoft.AspNetCore.Mvc;

//Cookies
using Microsoft.AspNetCore.Authorization;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace FoodTouch.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        //VISTAS______________________

        public IActionResult Index()
        {

            //Llenar botones con lo de la base ed datos
            var categorias = Cat_Categorias_Platillos.ObtenerCategoriasCombo();

            string idCategoria = "0";
            //Obtener todfo los platillos
            var listaPlatillos = Cat_Platillos.ObtenerPlatillosDependeEstatus(idCategoria);

            //var viewModel = new MenuViewModel
            //{
            //    Platillos = listaPlatillos,
            //    Categorias = categorias
            //};
            ViewBag.Categorias = categorias;

            // Enviar a la vista
            return View(listaPlatillos);




        }

        public IActionResult Ubicacion()
        {
            return View();
        }

        //Para mandar varias listas a la vista
        //public class MenuViewModel
        //{
        //    public List<Cat_Platillos> Platillos { get; set; }
        //    public List<Cat_Categorias_Platillos> Categorias { get; set; }
        //}

        //[Authorize(Roles = "Administrador,Supervisor,Empleado")]
        //public IActionResult Ventas()
        //{
        //    return View();
        //}

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        #region Metodos
        [HttpPost]
        public List<Cat_Platillos> ObtenerPlatillosDependeEstatus(string idCategoria)
        {
            return Cat_Platillos.ObtenerPlatillosDependeEstatus(idCategoria);
        }

        #endregion

    }
}
