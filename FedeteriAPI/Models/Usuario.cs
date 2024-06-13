using FedeteriAPI.Controllers;
using FedeteriAPI.Services;

namespace FedeteriAPI.Models
{
    public class UsuarioIn : UsuarioOut
    {
        public string Contrasena { get; set; }
        public int SucursalID { get; set; }

    }

    public class Usuario : UsuarioOut
    {
        public string Contrasena { get; set; }
        public List<ArticuloDeseado> ListaDeDeseos { get; set; }
        public List<int> Calificaciones { get; set; }

        public Usuario()
        {
            this.ListaDeDeseos = new List<ArticuloDeseado>();
            this.Calificaciones = new List<int>();
        }

        public Usuario(UsuarioIn usuario) : base(usuario)
        {
            this.Puntos = 0;
            this.Sucursal = SucursalesService.GetSucursal(usuario.SucursalID);
            this.Contrasena = usuario.Contrasena;
            this.ListaDeDeseos = new List<ArticuloDeseado>();
            this.Calificaciones = new List<int>();
        }

        public void Update(DatosPersonalesUsuario datos)
        {
            this.Nombre = datos.Nombre;
            this.Apellido = datos.Apellido;
            this.Telefono = datos.Telefono;
            this.Email = datos.Email;
            this.Sucursal = SucursalesService.GetSucursal(datos.SucursalId);
        }

        public void AddPoints(int puntos)
        {
            this.Puntos += puntos;
        }

        public void SubPoints(int puntos)
        {
            this.Puntos -= puntos;
        }
    }

    public class UsuarioOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }
        public string Nacimiento { get; set; }
        public long Telefono { get; set; }
        public bool EsAdmin { get; set; }
        public bool EsEmpleado { get; set; }
        public Sucursal? Sucursal { get; set; }
        public int Puntos { get; set; } = 0;


        public UsuarioOut() { }

        public UsuarioOut(UsuarioOut usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.Apellido = usuario.Apellido;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
            this.Nacimiento = usuario.Nacimiento;
            this.Telefono = usuario.Telefono;
            this.EsAdmin = usuario.EsAdmin;
            this.EsEmpleado = usuario.EsEmpleado;
            this.Sucursal = usuario.Sucursal;
            this.Puntos = usuario.Puntos;
        }
    }

    public class UsuarioPass
    {
        public int Id { get; set; }
        public string ContrasenaActual { get; set; }
        public string Contrasena { get; set; }

    }

    public class UsuarioRecoveryPass
    {
        public string Email { get; set; }
        public string Contrasena { get; set; }

    }

    public class DatosPersonalesUsuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public long Telefono { get; set; }
        public string Email { get; set; }
        public int SucursalId { get; set; }
    }

    public class CredencialesUsuario
    {
        public long DNI { get; set; }
        public string Contrasena { get; set; }
    }
}
