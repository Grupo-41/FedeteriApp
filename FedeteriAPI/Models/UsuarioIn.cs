namespace FedeteriAPI.Models
{
    public class UsuarioIn
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int DNI { get; set; }
        public string Email { get; set; }
        public int Celular { get; set; }
        public string Contrasena { get; set; }
        public string Nacimiento { get; set; }

    }
}
