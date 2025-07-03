//Código de Angel Navarro (Catalogo de platillos)
using Microsoft.Data.SqlClient;
namespace FoodTouch.Models
{
    public class Cat_Platillos
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string precioG { get; set; }
        public string precioCH { get; set; }
        public byte[] imagen { get; set; }
        public string idCategoria { get; set; }
        public string estatus { get; set; }
        public string imagenBase64 { get; set; }

        #region Select

        public static int ObtenerUltimoIdMasUno()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            int ID = 1;
            try
            {
                string query = string.Format(@"SELECT MAX(ID) FROM TBL_CAT_PLATILLOS");
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

        public static List<Cat_Platillos> ObtenerPlatillos(string categoria)
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                //Validar que tipo de busqueda será
                string parteQuery = "";
                if (categoria == "0") {
                    parteQuery = "";
                }
                else
                {
                    parteQuery = "WHERE idCategoria = '" + categoria + "'";
                }

                //Obtener 
                string query = string.Format(@"SELECT ID,nombre,descripcion,precioG,precioCH,idCategoria,estatus,imagen FROM TBL_CAT_PLATILLOS {0}", parteQuery);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Cat_Platillos> platillos = new List<Cat_Platillos>();
                    while (dr.Read())
                    {
                        Cat_Platillos plato = new Cat_Platillos();
                        plato.ID = int.Parse(dr[0].ToString());
                        plato.nombre = dr[1].ToString();
                        plato.descripcion = dr[2].ToString();
                        plato.precioG = dr[3].ToString();
                        plato.precioCH = dr[4].ToString();
                        plato.idCategoria = dr[5].ToString();
                        plato.estatus = dr[6].ToString();


                        byte[] imagenBytes = dr[7] as byte[];
                        plato.imagen = imagenBytes;

                        //Convertir la imagen Bytes en base64
                        if (imagenBytes != null && imagenBytes.Length > 0)
                        {
                            string mime = "image/jpeg";
                            plato.imagenBase64 = $"data:{mime};base64,{Convert.ToBase64String(imagenBytes)}";
                        }

                        platillos.Add(plato);  //Para ir agregando a la lista.
                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return platillos;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Cat_Platillos>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Cat_Platillos>();
            }

        }

        public static List<Cat_Platillos> ObtenerPlatillosDependeEstatus(string categoria)
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                //Validar que tipo de busqueda será
                string parteQuery = "";
                if (categoria == "0")
                {
                    parteQuery = "WHERE estatus = 'ACTIVO' ";
                }
                else
                {
                    parteQuery = "WHERE idCategoria = '" + categoria + "' AND estatus = 'ACTIVO'";
                }

                //Obtener 
                string query = string.Format(@"SELECT ID,nombre,descripcion,precioG,precioCH,idCategoria,estatus,imagen FROM TBL_CAT_PLATILLOS {0}", parteQuery);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Cat_Platillos> platillos = new List<Cat_Platillos>();
                    while (dr.Read())
                    {
                        Cat_Platillos plato = new Cat_Platillos();
                        plato.ID = int.Parse(dr[0].ToString());
                        plato.nombre = dr[1].ToString();
                        plato.descripcion = dr[2].ToString();
                        plato.precioG = dr[3].ToString();
                        plato.precioCH = dr[4].ToString();
                        plato.idCategoria = dr[5].ToString();
                        plato.estatus = dr[6].ToString();

                        byte[] imagenBytes = dr[7] as byte[];
                        plato.imagen = imagenBytes;

                        //Convertir la imagen Bytes en base64
                        if (imagenBytes != null && imagenBytes.Length > 0)
                        {
                            string mime = "image/jpeg";
                            plato.imagenBase64 = $"data:{mime};base64,{Convert.ToBase64String(imagenBytes)}";
                        }

                        platillos.Add(plato);  //Para ir agregando a la lista.

                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return platillos;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Cat_Platillos>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Cat_Platillos>();
            }

        }

        #endregion

        #region Insert
        public static string AgregarPlatillo(Cat_Platillos platillo)
        {
            platillo.ID = ObtenerUltimoIdMasUno();

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                // Convertir imagen a hexadecimal
                string hexImagen = ByteArrayToHexString(platillo.imagen);

                string query = string.Format(@"insert into TBL_CAT_PLATILLOS(ID,nombre,descripcion,precioG,precioCH,idCategoria,estatus,imagen) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}',{7})",
                platillo.ID, platillo.nombre, platillo.descripcion, platillo.precioG, platillo.precioCH, platillo.idCategoria, platillo.estatus, hexImagen);
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
        public static string ModificarPlatillo(Cat_Platillos platillo)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {
                //Convertir a hex antes de insertar
                string hexImagen = ByteArrayToHexString(platillo.imagen);

                string query = string.Format(@"UPDATE TBL_CAT_PLATILLOS
                SET nombre = '{1}',
                    descripcion = '{2}',
                    precioG = '{3}',
                    precioCH = '{4}',
                    estatus = '{5}',
                    imagen = {6}
                WHERE ID = '{0}'",
                platillo.ID, platillo.nombre, platillo.descripcion, platillo.precioG, platillo.precioCH, platillo.estatus, hexImagen);

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

        #region Extras

        public static string ByteArrayToHexString(byte[] bytes)
        {
            if (bytes == null || bytes.Length == 0)
                return "NULL"; // si no hay imagen

            return "0x" + BitConverter.ToString(bytes).Replace("-", "");
        }

        #endregion


    }
}
