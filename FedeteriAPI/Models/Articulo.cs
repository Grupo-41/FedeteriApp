namespace FedeteriAPI.Models
{
    public class ArticuloIn
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public double PrecioEstimado { get; set; }
        public string[] ImagenURLs { get; set; }
    }

    public class ArticuloOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Marca { get; set; }
        public double PrecioEstimado { get; set; }
        public string[] ImagenURLs { get; set; }
        public bool Tasado { get; set; } = false;

        public UsuarioOut Usuario { get; set; }

        public ArticuloOut(ArticuloIn articulo)
        {
            this.Nombre = articulo.Nombre;
            this.Descripcion = articulo.Descripcion;
            this.Estado = articulo.Estado;
            this.Marca = articulo.Marca;
            this.PrecioEstimado = articulo.PrecioEstimado;
            this.ImagenURLs = articulo.ImagenURLs;
            this.Tasado = false;
        }
    }
}
