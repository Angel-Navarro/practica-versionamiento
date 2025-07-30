//Código de Angel Navarro Sandoval
//Este codigo es el principal de las comandas de los platillos
using Microsoft.Data.SqlClient;

namespace FoodTouch.Models
{
    public class Comandas
    {
        #region Variables
        //Variables originales de cada comanda
        public int ID { get; set; }
        public int idUsuario { get; set; }
        public string mesa { get; set; }
        public string fechaHora { get; set; }
        public string estado { get; set; }
        public string notas { get; set; }


        //Variable de comanda Usuario
        public string usuarioNombre { get; set; }

        //Platillos de comandas
        public List<Comandas_Platillos> listaPlatillos { get; set; } = new List<Comandas_Platillos>();
        #endregion

        #region Select

        //Ultimo id mas 1 
        public static int ObtenerUltimoIdMasUno()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            int ID = 1;
            try
            {
                string query = string.Format(@"SELECT MAX(ID) FROM TBL_COMANDAS");
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

        //Obtener comandas dependiendo del dia con orden de antiguedad
        public static List<Comandas> ObtenerComandas(string dia)
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                //Obtener 
                string query = string.Format(@"SELECT c.ID, c.idUsuario, c.mesa, c.fechaHora, c.estado, c.notas, u.nombre
                FROM TBL_COMANDAS AS c
                JOIN TBL_USUARIOS AS u ON c.idUsuario = u.ID
                WHERE CONVERT(date, c.fechaHora) = '{0}'
                ORDER BY 
                c.fechaHora ASC", dia);

                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Comandas> comandas = new List<Comandas>();
                    while (dr.Read())
                    {


                        Comandas comanda = new Comandas();
                        comanda.ID = int.Parse(dr[0].ToString());
                        comanda.idUsuario = int.Parse(dr[1].ToString());
                        comanda.mesa = dr[2].ToString();
                        comanda.fechaHora = dr[3].ToString();
                        comanda.estado = dr[4].ToString();
                        comanda.notas = dr[5].ToString();
                        comanda.usuarioNombre = dr[6].ToString();

                        //Obtener platillos de comanda
                        comanda.listaPlatillos = Comandas_Platillos.ObtenerComandasPlatillos(comanda.ID);


                        //Ordenar de mayor a menor 

                        comandas.Add(comanda);
                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return comandas;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Comandas>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Comandas>();
            }

        }
        //Obtener comandas dependiendo del dia con orden de antiguedad
        public static List<Comandas> ObtenerComandasCocina(string dia)
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                //Obtener 
                string query = string.Format(@"SELECT c.ID, c.idUsuario, c.mesa, c.fechaHora, c.estado, c.notas, u.nombre
                FROM TBL_COMANDAS AS c
                JOIN TBL_USUARIOS AS u ON c.idUsuario = u.ID
                WHERE CONVERT(date, c.fechaHora) = '{0}'
                AND c.estado <> 'completed'
                ORDER BY 
                c.fechaHora ASC", dia);

                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Comandas> comandas = new List<Comandas>();
                    while (dr.Read())
                    {


                        Comandas comanda = new Comandas();
                        comanda.ID = int.Parse(dr[0].ToString());
                        comanda.idUsuario = int.Parse(dr[1].ToString());
                        comanda.mesa = dr[2].ToString();
                        comanda.fechaHora = dr[3].ToString();
                        comanda.estado = dr[4].ToString();
                        comanda.notas = dr[5].ToString();
                        comanda.usuarioNombre = dr[6].ToString();

                        //Obtener platillos de comanda
                        comanda.listaPlatillos = Comandas_Platillos.ObtenerComandasPlatillos(comanda.ID);


                        comandas.Add(comanda);
                    }
                    dr.Close();
                    conn.Close();
                    cmd.Dispose();
                    conn.Dispose();
                    return comandas;
                }
                else
                {
                    dr.Close();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                    return new List<Comandas>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Comandas>();
            }

        }

        #endregion

        #region Insert
        public static string AgregarComanda(Comandas comanda)
        {
            comanda.ID = ObtenerUltimoIdMasUno();

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"insert into TBL_COMANDAS (ID,idUsuario,mesa,fechaHora,estado,notas) values('{0}','{1}','{2}','{3}','{4}','{5}')",
                comanda.ID, comanda.idUsuario, comanda.mesa, comanda.fechaHora, comanda.estado, comanda.notas);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                cmd.Dispose();

                //Insertar platillos de comanda
                Comandas_Platillos.AgregarComandaPlatillos(comanda.ID, comanda.listaPlatillos);

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
        public static string ActualizarComanda(Comandas comanda)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_COMANDAS
                SET mesa = '{1}',
                    estado = '{2}',
                    notas = '{3}'
                WHERE ID = '{0}'",
                comanda.ID, comanda.mesa, comanda.estado, comanda.notas);

                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                cmd.Dispose();

                //Actualizar platillos de comanda.

                return "OK";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return "ERROR ";
            }
        }

        public static string ActualizarEstatusComanda(int idComanda, string estado)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_COMANDAS
                SET estado = '{1}'
                WHERE ID = {0}",
                idComanda, estado);

                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                cmd.Dispose();

                if(estado == "completed")
                {
                    // Si la comanda se cancela, también se cancelan los platillos asociados
                    Comandas_Platillos.ActualizarTodosEstatusComandaPlatillo(idComanda, "completed");
                }

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
