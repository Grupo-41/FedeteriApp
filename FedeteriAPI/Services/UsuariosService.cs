using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public class UsuariosService
    {
        static List<Usuario> Usuarios = new List<Usuario>();

        public static void Add(Usuario usuario)
        {
            Usuarios.Add(usuario);
        }

        public static List<Usuario> GetUsuarios()
        {
            return Usuarios;
        }

        public static Usuario GetUsuarioByID(int id)
        {
            return Usuarios.FirstOrDefault(x => x.Id == id);
        }
    }
}
