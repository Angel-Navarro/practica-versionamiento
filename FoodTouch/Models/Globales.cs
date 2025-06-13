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
    }
}
