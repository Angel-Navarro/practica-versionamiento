//Código de Angel Navarro (Controller de Home, permisos y accesos)
using System.Diagnostics;
using FoodTouch.Models;
using Microsoft.AspNetCore.Mvc;

//Cookies
using Microsoft.AspNetCore.Authorization;

namespace FoodTouch.Controllers
{
    [Authorize]
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
            return View();
        }

        [Authorize(Roles = "Administrador,Supervisor,Empleado")]
        public IActionResult Ventas()
        {
            return View();
        }

        [Authorize(Roles = "Administrador,Supervisor")]
        public IActionResult Compras()
        {
            return View();
        }

        public IActionResult Clientes()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
