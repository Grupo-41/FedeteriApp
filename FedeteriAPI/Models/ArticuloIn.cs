namespace FedeteriAPI.Models
{
    public class ArticuloIn
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public double PrecioEstimado { get; set; }
        public string[] ImagenURLs { get; set; }
    }
}
