using FedeteriAPI.Services;

namespace FedeteriAPI.Models
{
    public class TruequeOut
    {
        public int Id { get; set; }
        public ArticuloOut ArticuloSolicitado { get; set; }
        public ArticuloOut ArticuloOfrecido { get; set; }
        public Sucursal? Sucursal { get; set; }
        public bool? Aceptado { get; set; }
        public bool? Realizado { get; set; }
        public DateOnly? FechaRealizacion { get; set; }

        public TruequeOut() { }

        public TruequeOut(Trueque t)
        {
            Id = t.Id;
            ArticuloSolicitado = ArticulosService.GetArticulo(t.ArticuloSolicitadoID);
            ArticuloOfrecido = ArticulosService.GetArticulo(t.ArticuloOfrecidoID);
            Sucursal = t.SucursalID.HasValue ? SucursalesService.GetSucursal(t.SucursalID.Value) : null;
            Aceptado = t.Aceptado;
            Realizado = t.Realizado;
            FechaRealizacion = t.FechaRealizacion;
        }
    }

    public class Trueque
    {
        public int Id { get; set; }
        public int ArticuloSolicitadoID { get; set; }
        public int ArticuloOfrecidoID { get; set; }
        public int? SucursalID { get; set; }
        public bool? Aceptado { get; set; }
        public bool? Realizado { get; set; }
        public DateOnly? FechaRealizacion { get; set; }

        public Trueque() { }

        public Trueque(TruequeIn truequeIn)
        {
            ArticuloSolicitadoID = truequeIn.ArticuloSolicitadoID;
            ArticuloOfrecidoID = truequeIn.ArticuloOfrecidoID;
            SucursalID = null;
            Realizado = null;
            Aceptado = null;
            FechaRealizacion = null;
        }
    }

    public class TruequeIn
    {
        public int ArticuloSolicitadoID { get; set; }
        public int ArticuloOfrecidoID { get; set; }

    }
}
