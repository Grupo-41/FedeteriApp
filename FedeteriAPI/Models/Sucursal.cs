namespace FedeteriAPI.Models
{
    public class Sucursal
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string HorariosAtencion { get; set; }
        public List<int> Calificaciones { get; set; }
        public double Rating { get; set; }
        public long Telefono { get; set; }
    }
}
