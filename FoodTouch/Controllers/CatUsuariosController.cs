//Código de Angel Navarro (Controller de CrudUsuarios)
using FoodTouch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

//Cookies
using Microsoft.AspNetCore.Authorization;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System.Text;

//Hasheo
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace FoodTouch.Controllers
{
    [Authorize]
    public class CatUsuariosController : Controller
    {
        //Hashear Contraseñas
        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                    builder.Append(b.ToString("x2"));
                return builder.ToString();
            }
        }

        //Comprobar si es esta hasheada
        private bool EsHashSha256(string texto)
        {
            return Regex.IsMatch(texto, @"\A\b[0-9a-f]{64}\b\Z");
        }

        // utilizar los dos metodos para devolver la contraseña haseada correcta
        private string ObtenerPasswordSeguro(string password)
        {
            if (EsHashSha256(password))
                return password; // Ya está hasheado, no lo vuelvas a hashear

            return HashPassword(password); // No está hasheado, se hashea
        }


        //private readonly ILogger<CatPlatillosController> _logger;

        //public CatUsuariosController(ILogger<CatUsuariosController> logger)
        //{
        //    _logger = logger;
        //}


        // GET: CR_UsuariosController
        [Authorize(Roles = "Administrador")]
        public ActionResult Index()
        {

            // Traer todos los platillos (sin filtrar categoría: "0")
            var listaUsuarios = Cat_Usuarios.ObtenerUsuarios();

            // Enviar a la vista
            return View(listaUsuarios);
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


        #region Metodos de la clase

        //[HttpPost]
        //public string AgregarUsuario(string nombre, string correo, string clave, string rol)
        //{
        //    Cat_Usuarios usuario = new Cat_Usuarios();
        //    usuario.nombre = nombre;
        //    usuario.correo = correo;
        //    usuario.clave = clave;
        //    usuario.rol = rol;


        //    // Llama al metodo EnviarCorreo desde la instancia creada
        //    return Cat_Usuarios.AgregarUsuario(usuario);
        //}

        [HttpPost]
        public string AgregarUsuario(string nombre, string correo, string clave, string rol)
        {
            Cat_Usuarios usuario = new Cat_Usuarios();
            usuario.nombre = nombre;
            usuario.correo = correo;

            // Encriptar clave
            usuario.clave = ObtenerPasswordSeguro(clave);

            usuario.rol = rol;

            return Cat_Usuarios.AgregarUsuario(usuario);
        }


        //[HttpPost]
        //public string ModificarUsuario(string ID, string nombre, string correo, string clave, string rol)
        //{
        //    Cat_Usuarios usuario = new Cat_Usuarios();
        //    usuario.ID = int.Parse(ID);
        //    usuario.nombre = nombre;
        //    usuario.correo = correo;
        //    usuario.clave = clave;
        //    usuario.rol = rol;

        //    return Cat_Usuarios.ModificarUsuario(usuario);
        //}

        [HttpPost]
        public string ModificarUsuario(string ID, string nombre, string correo, string clave, string rol)
        {
            Cat_Usuarios usuario = new Cat_Usuarios();
            usuario.ID = int.Parse(ID);
            usuario.nombre = nombre;
            usuario.correo = correo;

            // Hashear clave
            usuario.clave = ObtenerPasswordSeguro(clave);

            usuario.rol = rol;

            return Cat_Usuarios.ModificarUsuario(usuario);
        }


        [HttpGet]
        public List<Cat_Usuarios> ObtenerUsuarios()
        {
            return Cat_Usuarios.ObtenerUsuarios();
        }

        #endregion

    }
}
