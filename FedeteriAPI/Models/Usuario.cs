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

    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }
        public long Celular { get; set; }
        public string Contrasena { get; set; }
        public string Nacimiento { get; set; }
        public List<string> ListaDeDeseos { get; set; }

        public Usuario()
        {

        }

        public Usuario(UsuarioIn usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.Celular = usuario.Celular;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
            this.Contrasena = usuario.Contrasena;
            this.ListaDeDeseos = new List<string>();
        }
    }

    public class UsuarioOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }
        public List<string> ListaDeDeseos { get; set; } = new List<string>();


        public UsuarioOut(Usuario usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
            this.ListaDeDeseos = usuario.ListaDeDeseos;
        }
    }

    public class UsuarioPass
    {
        public int Id { get; set; }
        public string ContrasenaActual { get; set; }
        public string Contrasena { get; set; }

    }
}
