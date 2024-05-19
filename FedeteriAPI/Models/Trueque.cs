using FedeteriAPI.Services;

namespace FedeteriAPI.Models
{
    public class Trueque
    {
        public int Id { get; set; }
        public Usuario UsuarioSolicitante { get; set; }
        public Usuario UsuarioSolicitado { get; set; }
        public ArticuloOut ArticuloSolicitado { get; set; }
        public ArticuloOut ArticuloOfrecido { get; set; }

        public Sucursal Sucursal { get; set; }

        public bool? Aceptado { get; set; }
        public bool Realizado { get; set; }

        public Trueque(TruequeIn truequeIn)
        {
            UsuarioSolicitado = UsuariosService.GetUsuarioByID(truequeIn.UsuarioSolicitadoID);
            UsuarioSolicitante = UsuariosService.GetUsuarioByID(truequeIn.UsuarioSolicitanteID);
            ArticuloSolicitado = ArticulosService.GetArticulo(truequeIn.ArticuloSolicitadoID);
            ArticuloOfrecido = ArticulosService.GetArticulo(truequeIn.ArticuloOfrecidoID);
            Realizado = false;
            Aceptado = null;
        }
    }

    public class TruequeIn
    {
        public int UsuarioSolicitanteID { get; set; }
        public int UsuarioSolicitadoID { get; set; }
        public int ArticuloSolicitadoID { get; set; }
        public int ArticuloOfrecidoID { get; set; }

    }
}
