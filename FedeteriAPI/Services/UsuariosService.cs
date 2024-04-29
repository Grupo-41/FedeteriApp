using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public class UsuariosService
    {
        static List<UsuarioIn> Usuarios = new List<UsuarioIn>();

        public static void Add(UsuarioIn usuario)
        {
            Usuarios.Add(usuario);
        }

        public static List<UsuarioIn> GetUsuarios()
        {
            return Usuarios;
        }

        public static UsuarioIn GetUsuarioByID(int id)
        {
            return Usuarios.FirstOrDefault(x => x.Id == id);
        }

        public static List<ArticuloOut> GetArticulos(int userId)
        {
            return ArticulosService.GetArticulosByUsuario(userId);
        }
    }
}
