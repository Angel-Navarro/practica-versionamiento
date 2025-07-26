//Codigo de Angel Navarro (Logica de login)

using Microsoft.AspNetCore.Mvc;

using FoodTouch.Models;
using FoodTouch.Data;
using System.Reflection;

//Autenticacion, seguridad y cookies
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

//Para consumir la api creada
//using System.Net.Http;
//using System.Text;
//using System.Text.Json;




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

            if (usuario != null)
            {

                var claims = new List<Claim> {

                    new Claim(ClaimTypes.Name, usuario.nombre),
                    new Claim("Correo", usuario.correo),
                    new Claim("ID", usuario.id.ToString())

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



        //Para Utilizar la Api

        //[HttpPost]
        //public async Task<IActionResult> Index(Usuario _usuario)
        //{
        //    Usuario usuario = null;

        //    var handler = new HttpClientHandler
        //    {
        //        ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        //    };

        //    using (var httpClient = new HttpClient(handler))
        //    {
        //        string apiUrl = "https://localhost:7152/api/LoginApi/validar";
        //        var json = JsonSerializer.Serialize(_usuario);
        //        Console.WriteLine("JSON ENVIADO: " + json);

        //        var content = new StringContent(json, Encoding.UTF8, "application/json");
        //        var response = await httpClient.PostAsync(apiUrl, content);

        //        var responseText = await response.Content.ReadAsStringAsync();
        //        Console.WriteLine("RESPUESTA API: " + responseText);
        //        Console.WriteLine("STATUS CODE: " + response.StatusCode);

        //        if (response.IsSuccessStatusCode)
        //        {
        //            usuario = JsonSerializer.Deserialize<Usuario>(responseText, new JsonSerializerOptions
        //            {
        //                PropertyNameCaseInsensitive = true
        //            });
        //        }
        //    }

        //    if (usuario != null)
        //    {
        //        var claims = new List<Claim> {
        //    new Claim(ClaimTypes.Name, usuario.nombre),
        //    new Claim("Correo", usuario.correo)
        //};

        //        foreach (string rol in usuario.roles)
        //        {
        //            claims.Add(new Claim(ClaimTypes.Role, rol));
        //        }

        //        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        //        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

        //        return RedirectToAction("Index", "Home");
        //    }
        //    else
        //    {
        //        ViewBag.MostrarModal = true;
        //        return View();
        //    }
        //}


        //Para cerrar sesion
        public async Task<IActionResult> Salir()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Acceso");
        }
    }
}
