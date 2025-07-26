//Código de Angel Navarro (Código del CRUD de usuarios)
using Microsoft.Data.SqlClient;

namespace FoodTouch.Models
{
    public class Cat_Usuarios
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string correo { get; set; }
        public string clave { get; set; }
        public string rol { get; set; }

        #region Select

        public static int ObtenerUltimoIdMasUno()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            int ID = 1;
            try
            {
                string query = string.Format(@"SELECT MAX(ID) FROM TBL_USUARIOS");
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Read();
                    int ultID = int.Parse(dr[0].ToString());
                    ID = ultID + 1;
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return ID;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return ID;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return ID;
            }

        }

        public static List<Cat_Usuarios> ObtenerUsuarios()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                //Obtener 
                string query = string.Format(@"SELECT ID,nombre,correo,clave,roles FROM TBL_USUARIOS");
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Cat_Usuarios> usuarios = new List<Cat_Usuarios>();
                    while (dr.Read())
                    {
                        Cat_Usuarios usuario = new Cat_Usuarios();
                        usuario.ID = int.Parse(dr[0].ToString());
                        usuario.nombre = dr[1].ToString();
                        usuario.correo = dr[2].ToString();
                        usuario.clave = dr[3].ToString();
                        usuario.rol = dr[4].ToString();
                        usuarios.Add(usuario);  //Para ir agregando a la lista.
                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return usuarios;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Cat_Usuarios>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Cat_Usuarios>();
            }

        }

        #endregion

        #region Insert
        public static string AgregarUsuario(Cat_Usuarios usuario)
        {
            usuario.ID = ObtenerUltimoIdMasUno();

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"insert into TBL_USUARIOS (ID,nombre,correo,clave,roles) values('{0}','{1}','{2}','{3}','{4}')",
                usuario.ID, usuario.nombre, usuario.correo, usuario.clave, usuario.rol);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                cmd.Dispose();
                return "OK";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return "ERROR";
            }
        }
        #endregion

        #region Update
        public static string ModificarUsuario(Cat_Usuarios usuario)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_USUARIOS
                SET nombre = '{1}',
                    correo = '{2}',
                    clave = '{3}',
                    roles = '{4}'
                WHERE ID = '{0}'",
                usuario.ID, usuario.nombre, usuario.correo, usuario.clave, usuario.rol);

                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                cmd.Dispose();
                return "OK";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return "ERROR ";
            }
        }
        #endregion

    }
}
