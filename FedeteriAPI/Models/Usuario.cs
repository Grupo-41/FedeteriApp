namespace FedeteriAPI.Models
{
    public class UsuarioIn
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }
        public long Celular { get; set; }
        public string Contrasena { get; set; }
        public string Nacimiento { get; set; }

    }

    public class UsuarioOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }

        public UsuarioOut(UsuarioIn usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
        }
    }

    public class UsuarioPass
    {
        public int Id { get; set; }
        public string ContrasenaActual { get; set; }
        public string Contrasena { get; set; }

    }
}
