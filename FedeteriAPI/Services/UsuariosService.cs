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

        public static Articulo GetArticulo(int userId, int articuloId)
        {
            Usuario user = Usuarios.FirstOrDefault(x => x.Id == userId);

            return user == null ? null : user.GetArticulo(articuloId);
        }

        public static void AddArticulo(int userId, Articulo articulo)
        {
            int index = Usuarios.FindIndex(x => x.Id == userId);

            if(index != -1)
                Usuarios[index].AddArticulo(articulo);
        }
    }
}
