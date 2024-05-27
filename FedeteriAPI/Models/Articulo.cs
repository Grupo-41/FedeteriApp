namespace FedeteriAPI.Models
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
        public bool Truequeado { get; set; } = false;

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
            this.ArticuloAsociado = articulo.ArticuloAsociado;
            this.ImageNames = new List<string>();
        }
    }

    public class ArticuloDeseado
    {
        public string Descripcion { get; set; }
        public string Marca { get; set; }
    }
}
