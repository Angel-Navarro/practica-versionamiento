using Microsoft.Data.SqlClient;
namespace FoodTouch.Models
{
    public class Cat_Categorias_Platillos
    {
        public string ID { get; set; }
        public string nombre { get; set; }

        #region Select
        public static string ObtenerNombreConId(string id)
        {
            string nombre;
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                string query = string.Format(@"select nombre from TBL_CAT_CATEGORIAS_PLATILLOS where ID = '{0}'", id);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Read();
                    nombre = dr[0].ToString();

                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return nombre;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return "";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return "ERROR";
            }
        }

        public static List<Cat_Categorias_Platillos> ObtenerCategoriasCombo()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                string query = string.Format(@"SELECT ID,nombre FROM TBL_CAT_CATEGORIAS_PLATILLOS");
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Cat_Categorias_Platillos> categorias = new List<Cat_Categorias_Platillos>();
                    while (dr.Read())
                    {
                        Cat_Categorias_Platillos categoria = new Cat_Categorias_Platillos();
                        categoria.ID = dr[0].ToString();
                        categoria.nombre = dr[1].ToString();
                        categorias.Add(categoria);
                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return categorias;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Cat_Categorias_Platillos>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Cat_Categorias_Platillos>();
            }
        }
        #endregion

    }
}
