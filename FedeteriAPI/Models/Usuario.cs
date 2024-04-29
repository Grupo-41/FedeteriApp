namespace FedeteriAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string DNI { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Contrasena { get; set; }
        public DateTime Nacimiento { get; set; }
    }
}
