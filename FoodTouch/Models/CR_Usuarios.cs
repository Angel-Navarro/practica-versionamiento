//Código de Angel Navarro (Código del CRUD de usuarios)
using Microsoft.Data.SqlClient;

namespace FoodTouch.Models
{
    public class CR_Usuarios
    {
        public string nombre { get; set; }
        public string correo { get; set; }
        public string clave { get; set; }
        public string role { get; set; }

        #region Insert
        //public string ValidarUsuario(string nombre, string correo, string clave, string rol)
        //{

        //    string resp;
        //    SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
        //    try
        //    {
        //        string query = string.Format(@"INSERT INTO TBL_Usuarios (id, nombre, correo, clave, rol)
        //        VALUES ('{0}', '{1}', '{2}', '{3}', '{4}'); ", id, nombre, correo, clave, rol);
        //        conn.Open();
        //        SqlCommand cmd = new SqlCommand(query, conn);
        //        SqlDataReader dr = cmd.ExecuteReader();
        //        if (dr.HasRows)
        //        {
        //            dr.Read();
        //            usuario.nombre = dr[0].ToString();
        //            usuario.correo = dr[1].ToString();
        //            usuario.clave = dr[2].ToString();

        //            // Esto es temporal solo se manejara un rol
        //            usuario.roles = dr[3].ToString().Split(',');

        //            dr.Close();
        //            conn.Close();
        //            cmd.Dispose();
        //            conn.Dispose();
        //            return usuario;
        //        }
        //        else
        //        {
        //            dr.Close();
        //            conn.Close();
        //            conn.Dispose();
        //            cmd.Dispose();
        //            usuario = null;
        //            return usuario;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        usuario = null;
        //        Console.WriteLine(ex.ToString());
        //        return usuario;
        //    }
        //}
        #endregion

    }
}
