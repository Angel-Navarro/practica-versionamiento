using System.Configuration;
using System.Data.SqlClient;


namespace FoodTouch.Models
{
    public class Globales
    {
        public static class GlobalVariables
        {
            public static string server = "https://localhost:7154/";
            public static string conexion_db = "Server=DESKTOP-IH0IEFG\\SQLEXPRESS;Database=FoodTouch;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;";

        }

        #region Validaciones
        //Validacion SQL
        public static bool ValidacionSQL(string texto)
        {
            if (string.IsNullOrWhiteSpace(texto))
                return false;

            string[] patrones = new string[]
            {
                "select ", "insert ", "update ", "delete ", "drop ", "alter ", "--", ";", "'", "\"", "=", "<", ">"
            };

            texto = texto.ToLower(); // Para simplificar comparaciones

            foreach (var patron in patrones)
            {
                if (texto.Contains(patron))
                    return false;
            }

            return true;
        }
        #endregion
    }
}
