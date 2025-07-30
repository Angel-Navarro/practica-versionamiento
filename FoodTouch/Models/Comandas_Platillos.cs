//Código de Angel Navarro
using Microsoft.Data.SqlClient;
using System.Data;

namespace FoodTouch.Models
{
    public class Comandas_Platillos
    {
        #region Variables
        public int ID { get; set; }
        public int idComanda { get; set; }
        public int idPlatillo { get; set; }
        public int cantidad { get; set; }
        public string tamano { get; set; }
        public decimal precioTotal { get; set; }
        public string estado { get; set; }
        public string notas { get; set; }
        public string nombrePlatillo { get; set; }
        public decimal precioG { get; set; }
        public decimal precioCH { get; set; }

        #endregion

        #region Select 
        //Ultimo id mas 1 
        public static int ObtenerUltimoIdMasUno()
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            int ID = 1;
            try
            {
                string query = string.Format(@"SELECT MAX(ID) FROM TBL_COMANDAS_PLATILLOS");
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

        //Obtener Platillos por comanda
        public static List<Comandas_Platillos> ObtenerComandasPlatillos(int idComanda)
        {
            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                //Obtener 
                string query = string.Format(@"SELECT 
                    cp.ID, 
                    cp.idComanda, 
                    cp.idPlatillo, 
                    cp.cantidad, 
                    cp.tamano, 
                    cp.precioTotal, 
                    cp.estado, 
                    cp.notas, 
                    p.nombre ,
                    p.precioG,
                    p.precioCH  
                FROM TBL_COMANDAS_Platillos AS cp
                JOIN TBL_CAT_PLATILLOS AS p ON cp.idPlatillo = p.ID
                WHERE cp.idComanda = {0}
                ", idComanda);
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows)
                {
                    List<Comandas_Platillos> platillos = new List<Comandas_Platillos>();
                    while (dr.Read())
                    {


                        Comandas_Platillos platillo = new Comandas_Platillos();
                        platillo.ID = int.Parse(dr[0].ToString());
                        platillo.idComanda = int.Parse(dr[1].ToString());
                        platillo.idPlatillo = int.Parse(dr[2].ToString());
                        platillo.cantidad = int.Parse(dr[3].ToString());
                        platillo.tamano = dr[4].ToString();
                        //Transformar a decimal
                        platillo.precioTotal = dr.IsDBNull(5) ? 0 : Convert.ToDecimal(dr[5]);
                        platillo.estado = dr[6].ToString();
                        platillo.notas = dr[7].ToString();
                        platillo.nombrePlatillo = dr[8].ToString();
                        platillo.precioG = dr.IsDBNull(5) ? 0 : Convert.ToDecimal(dr[5]);
                        platillo.precioCH = dr.IsDBNull(5) ? 0 : Convert.ToDecimal(dr[5]);

                        platillos.Add(platillo);
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
                    return new List<Comandas_Platillos>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Comandas_Platillos>();
            }

        }
        #endregion

        #region Insert
        //Agregar platillos de comanda
        public static string AgregarComandaPlatillos(int comandaID,List <Comandas_Platillos> platillos)
        {
            try
            {
                foreach (Comandas_Platillos platillo in platillos) {
                    platillo.ID = ObtenerUltimoIdMasUno();

                    SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
                    string query = string.Format(@"insert into TBL_COMANDAS_Platillos 
                    (ID,idComanda,idPlatillo,cantidad,tamano,precioTotal,estado,notas) 
                    values({0}, {1}, {2}, {3}, '{4}', '{5}', '{6}', '{7}')",
                    platillo.ID, comandaID, platillo.idPlatillo,platillo.cantidad,platillo.tamano,platillo.precioTotal,
                    platillo.estado,platillo.notas);
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();
                    cmd.Dispose();
                }

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
        public static string ActualizarComanda(Comandas_Platillos platillo)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_COMANDAS_Platillos
                SET cantidad = '{1}',
                    precioTotal = '{2}',
                    notas = '{3}'
                WHERE ID = '{0}'",
                platillo.ID, platillo.cantidad, platillo.precioTotal, platillo.notas);

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

        public static string ActualizarEstatusComandaPlatillo(int ID, string estado)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_COMANDAS_PLATILLOS
                SET estado = '{1}'
                WHERE ID = '{0}'",
                ID, estado);

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
        public static string ActualizarTodosEstatusComandaPlatillo(int idComPlatillo, string estado)
        {

            SqlConnection conn = new SqlConnection(Globales.GlobalVariables.conexion_db);
            try
            {

                string query = string.Format(@"UPDATE TBL_COMANDAS_PLATILLOS
                SET estado = '{1}'
                WHERE idComanda = '{0}'",
                idComPlatillo, estado);

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
