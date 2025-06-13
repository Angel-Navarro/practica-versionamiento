//Código de Angel Navarro (Modelo donde se valida el inicio de sesión)
using FoodTouch;
using FoodTouch.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;

namespace FoodTouch.Data
{
    public class DA_Logica
    {
        //Admin, super, empleado

        //Verificar si el usuario existe y si si regresarlo
        //public List<Usuario> ListaUsuario()
        //{
        //    return new List<Usuario> { 
        //        new Usuario{nombre = "Jose", correo="administrador@gmail.com", clave = "123", roles = new string[]{"Administrador" } },
        //        new Usuario{nombre = "Maria", correo="supervisor@gmail.com", clave = "123", roles = new string[]{ "Supervisor" } },
        //        new Usuario{nombre = "Juan", correo="empleado@gmail.com", clave = "123", roles = new string[]{ "Empleado" } },
        //    };
        //}

        //public Usuario ValidarUsuario(string correo, string clave) {
        //    return ListaUsuario().Where(item => item.correo == correo && item.clave == clave).FirstOrDefault();
        //}

        //-----------------------------------------




        //Metodo para Validar usuario (Acceso)
        public Usuario ValidarUsuario(string correo, string clave)
        {
            Usuario usuario = new Usuario();
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                string query = string.Format(@"select nombre,correo,clave,roles from TBL_Usuarios where correo = '{0}' AND clave = '{1}'", correo, clave);     
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Read();
                    usuario.nombre = dr[0].ToString(); 
                    usuario.correo = dr[1].ToString(); 
                    usuario.clave = dr[2].ToString();

                    // Esto es temporal solo se manejara un rol
                    usuario.roles = dr[3].ToString().Split(',');

                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return usuario;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    usuario = null;
                    return usuario;
                }
            }
            catch (Exception ex)
            {
                usuario = null;
                Console.WriteLine(ex.ToString());
                return usuario;
            }
        }

    }
}
