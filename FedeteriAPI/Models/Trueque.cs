using FedeteriAPI.Services;

namespace FedeteriAPI.Models
{
    public class Trueque
    {
        public int Id { get; set; }
        public UsuarioOut UsuarioSolicitante { get; set; }
        public UsuarioOut UsuarioSolicitado { get; set; }
        public ArticuloOut ArticuloSolicitado { get; set; }
        public ArticuloOut ArticuloOfrecido { get; set; }

        public Sucursal? Sucursal { get; set; }

        public bool? Aceptado { get; set; }
        public bool Realizado { get; set; }

        public Trueque() { }

        public Trueque(TruequeIn truequeIn)
        {
            ArticuloSolicitado = ArticulosService.GetArticulo(truequeIn.ArticuloSolicitadoID);
            ArticuloOfrecido = ArticulosService.GetArticulo(truequeIn.ArticuloOfrecidoID);
            UsuarioSolicitado = ArticuloSolicitado.Usuario;
            UsuarioSolicitante = ArticuloOfrecido.Usuario;
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
