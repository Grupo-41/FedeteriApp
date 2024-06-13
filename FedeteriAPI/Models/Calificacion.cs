namespace FedeteriAPI.Models
{
    public class Calificacion
    {
        public int Rating { get; set; }
        public string Descripcion { get; set; }
        public int TruequeID { get; set; }
        public int UsuarioID { get; set; }

    }

    public class CalificacionUsuario : Calificacion
    {
        public int UsuarioCalificadoID { get; set; }
    }

    public class CalificacionSucursal : Calificacion
    {
        public int SucursalCalificadaID { get; set; }
    }

    public class CalificacionUsuarioResult
    {
        public UsuarioOut Usuario { get; set; }
        public double Rating { get; set; }
        public int Votantes { get; set; }
    }

    public class CalificacionSucursalResult
    {
        public Sucursal Sucursal { get; set; }
        public double Rating { get; set; }
        public int Votantes { get; set; }

    }
}
