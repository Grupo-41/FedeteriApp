﻿namespace FedeteriAPI.Models
{
    public class ArticuloIn
    {
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public int? ArticuloAsociado { get; set; } = null;
        public IFormFile[] Images { get; set; }
    }

    public class ArticuloOut
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public string Categoria { get; set; }
        public int? ArticuloAsociado { get; set; } = null;
        public List<string> ImageNames { get; set; }
        public bool Tasado { get; set; } = false;
        public DateTime? Destacado { get; set; }
        public bool Truequeado { get; set; } = false;
        public List<Comentario> Comentarios { get; set; }

        public UsuarioOut Usuario { get; set; }

        public ArticuloOut()
        {

        }

        public ArticuloOut(ArticuloIn articulo)
        {
            this.Descripcion = articulo.Descripcion;
            this.Estado = articulo.Estado;
            this.Marca = articulo.Marca;
            this.Categoria = "";
            this.Tasado = false;
            this.Truequeado = false;
            this.Destacado = null;
            this.ArticuloAsociado = articulo.ArticuloAsociado;
            this.ImageNames = new List<string>();
            this.Comentarios = new List<Comentario>();
        }
    }

    public class ArticuloDeseado
    {
        public string Descripcion { get; set; }
        public string Marca { get; set; }
    }

    public class ArticuloFedeteria
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public string Image { get; set; }
        public int Precio { get; set; }
        public List<Venta> Ventas { get; set; }

        public ArticuloFedeteria()
        {
            Ventas = new List<Venta>();
        }

        public int GetCountVentas()
        {
            return Ventas.Count;
        }
    }

    public class Venta
    {
        public int UsuarioID { get; set; }
        public int TruequeID { get; set; }
        public DateOnly? Fecha { get; set; }
    }
}
