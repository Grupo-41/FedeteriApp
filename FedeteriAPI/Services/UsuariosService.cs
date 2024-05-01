using CinemaNightAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public class UsuariosService
    {
        static List<Usuario> Usuarios = new List<Usuario>();
        static int ActualID = 0;

        public static void WriteAll() => FilesService<Usuario>.WriteAll(Paths.FILE_USUARIOS, Usuarios);
        public static async Task ReadAllAsync() {
            Usuarios = await FilesService<Usuario>.ReadAllAsync(Paths.FILE_USUARIOS);

            if(Usuarios.Count > 0)
                ActualID = Usuarios.Max(x => x.Id) + 1;
        }

        public static void Add(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            Usuarios.Add(new Usuario(usuario));
            WriteAll();
        }

        public static List<Usuario> GetUsuarios()
        {
            return Usuarios;
        }

        public static Usuario GetUsuarioByID(int id)
        {
            return Usuarios.FirstOrDefault(x => x.Id == id);
        }

        public static List<ArticuloOut> GetArticulos(int userId)
        {
            return ArticulosService.GetArticulosByUsuario(userId);
        }

        public static List<string> GetListaDeDeseos(int id)
        {
            return GetUsuarioByID(id).ListaDeDeseos;
        }

        public static void AddArticuloDeseado(int id, string articulo)
        {
            GetUsuarioByID(id).ListaDeDeseos.Add(articulo);
        }

        public static async Task<bool> EnviarCodigoRecuperacionAsync(string userMail)
        {
            string codigo = CodigosService.GenerarCodigo(userMail);
            if (codigo == null || string.IsNullOrEmpty(codigo))
                return false;

            await CodigosService.EnviarCodigo(userMail, codigo);
            return true;
        }

        public static bool ChangePassword(UsuarioPass usuarioPass)
        {
            Usuario toUpdate = Usuarios.FirstOrDefault(x => x.Id == usuarioPass.Id);
            if (toUpdate == null || toUpdate.Contrasena != usuarioPass.ContrasenaActual)
                return false;
            
            toUpdate.Contrasena = usuarioPass.Contrasena;
            return true;
        }
    }
}
