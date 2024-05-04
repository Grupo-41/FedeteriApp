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

            if (Usuarios.FindIndex(x => x.EsAdmin) == -1)
                Usuarios.Add(new Usuario()
                {
                    Email = @"nicoyurec@gmail.com",
                    DNI = 43386791,
                    Nombre = "Admin",
                    Contrasena = "FedeteriAdmin",
                    Nacimiento = "01/01/2001",
                    Telefono = 2216325117,
                    EsAdmin = true,
                    EsEmpleado = false,
                    Id = ActualID,
                });
        }

        public static void AddEmpleado(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            usuario.EsAdmin = false;
            usuario.EsEmpleado = true;
            Usuarios.Add(new Usuario(usuario));
            WriteAll();
        }

        public static void AddUsuario(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            usuario.EsAdmin = false;
            usuario.EsEmpleado = false;
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

        public static Usuario GetUsuarioByEmail(string email)
        {
            return Usuarios.FirstOrDefault(x => x.Email == email);
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

        public static UsuarioOut ValidarLogin(CredencialesUsuario usuario)
        {
            Usuario u = GetUsuarioByDNI(usuario.DNI);

            if(u == null) return null;
            
            if(u.Contrasena == usuario.Contrasena)
                return new UsuarioOut(u);

            return null;
        }

        private static Usuario GetUsuarioByDNI(long DNI)
        {
            return Usuarios.FirstOrDefault(x => x.DNI == DNI);
        }

        internal static List<Usuario> GetEmpleados()
        {
            return Usuarios.FindAll(x => x.EsEmpleado);
        }

        public static void UpdateUsuario(DatosPersonalesUsuario usuario)
        {
            Usuario u = GetUsuarioByID(usuario.Id);
            if(u == null) return;

            u.Update(usuario);
        }
    }
}
