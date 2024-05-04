﻿using FedeteriAPI.Controllers;
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
        public List<string> ListaDeDeseos { get; set; }

        public Usuario()
        {

        }

        public Usuario(UsuarioIn usuario) : base(usuario)
        {
            this.Sucursal = SucursalesService.GetSucursal(usuario.SucursalID);
            this.Contrasena = usuario.Contrasena;
            this.ListaDeDeseos = new List<string>();
        }

        public void Update(DatosPersonalesUsuario datos)
        {
            this.Telefono = datos.Telefono;
            this.Email = datos.Email;
        }
    }

    public class UsuarioOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public long DNI { get; set; }
        public string Email { get; set; }
        public string Nacimiento { get; set; }
        public long Telefono { get; set; }
        public bool EsAdmin { get; set; }
        public bool EsEmpleado { get; set; }
        public Sucursal? Sucursal { get; set; }


        public UsuarioOut() { }

        public UsuarioOut(UsuarioOut usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
            this.Nacimiento = usuario.Nacimiento;
            this.Telefono = usuario.Telefono;
            this.EsAdmin = usuario.EsAdmin;
            this.EsEmpleado = usuario.EsEmpleado;
        }
    }

    public class EmpleadoOut
    {

    }

    public class UsuarioPass
    {
        public int Id { get; set; }
        public string ContrasenaActual { get; set; }
        public string Contrasena { get; set; }

    }

    public class DatosPersonalesUsuario
    {
        public int Id { get; set; }
        public long Telefono { get; set; }
        public string Email { get; set; }

    }

    public class CredencialesUsuario
    {
        public long DNI { get; set; }
        public string Contrasena { get; set; }
    }
}
