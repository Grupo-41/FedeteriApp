namespace FedeteriAPI.Models
{
    public class ArticuloIn
    {
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public double PrecioEstimado { get; set; }
        public IFormFile[] Images { get; set; }
    }

    public class ArticuloOut
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public string Categoria { get; set; }
        public double PrecioEstimado { get; set; }
        public List<string> ImageNames { get; set; }
        public bool Tasado { get; set; } = false;

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
            this.PrecioEstimado = articulo.PrecioEstimado;
            this.Tasado = false;
            this.ImageNames = new List<string>();
        }
    }
}
