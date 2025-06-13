namespace FoodTouch.Models
{
    public class Usuario
    {
        public string nombre { get; set; }
        public string correo { get; set; }
        public string clave { get; set; }
        public string[] roles { get; set; }
    }
}
