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
        public bool Realizado { get; set; }

        public TruequeOut(Trueque t)
        {
            Id = t.Id;
            ArticuloSolicitado = ArticulosService.GetArticulo(t.ArticuloSolicitadoID);
            ArticuloOfrecido = ArticulosService.GetArticulo(t.ArticuloOfrecidoID);
            Sucursal = t.Sucursal;
            Aceptado = t.Aceptado;
            Realizado = t.Realizado;
        }
    }

    public class Trueque
    {
        public int Id { get; set; }
        public int ArticuloSolicitadoID { get; set; }
        public int ArticuloOfrecidoID { get; set; }
        public Sucursal? Sucursal { get; set; }
        public bool? Aceptado { get; set; }
        public bool Realizado { get; set; }

        public Trueque() { }

        public Trueque(TruequeIn truequeIn)
        {
            ArticuloSolicitadoID = truequeIn.ArticuloSolicitadoID;
            ArticuloOfrecidoID = truequeIn.ArticuloOfrecidoID;
            Realizado = false;
            Aceptado = null;
        }
    }

    public class TruequeIn
    {
        public int ArticuloSolicitadoID { get; set; }
        public int ArticuloOfrecidoID { get; set; }

    }
}
