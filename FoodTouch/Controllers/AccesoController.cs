//Codigo de Angel Navarro (Logica de login)

using Microsoft.AspNetCore.Mvc;

using FoodTouch.Models;
using FoodTouch.Data;
using System.Reflection;

//Autenticacion, seguridad y cookies
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;



namespace FoodTouch.Controllers
{
    public class AccesoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        //Validación de acceso del usuario, los metodos de cookies trabajan asincrono 
        [HttpPost]
        public async Task<IActionResult> Index(Usuario _usuario)
        {
            DA_Logica _da_usuario = new DA_Logica();

            //Verifica que exista un usuario con esos parametros
            var usuario = _da_usuario.ValidarUsuario(_usuario.correo, _usuario.clave);

            if (usuario != null) {

                var claims = new List<Claim> {

                    new Claim(ClaimTypes.Name, usuario.nombre),
                    new Claim("Correo", usuario.correo)

                };

                //Recorrer los roles para pasarle el rol que tiene nuestro usuario 
                foreach (string rol in usuario.roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, rol));
                }

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));


                return RedirectToAction("Index", "Home");
            }
            else
            {
                //Agregar alert 
                ViewBag.MostrarModal = true;
                return View();
            }
        }

        public async Task<IActionResult> Salir()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Acceso");
        }
    }
}
