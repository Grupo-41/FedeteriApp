namespace FedeteriAPI.Models
{
    public class Articulo
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public double PrecioEstimado { get; set; }
        public string[] ImagenURLs { get; set; }
        public bool Tasado { get; set; } = false;
    }
}
