namespace FedeteriAPI.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public Sucursal Sucursal { get; set; }
        public string Nacimiento { get; set; }
    }
}
