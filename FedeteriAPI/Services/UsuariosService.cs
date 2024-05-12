using FedeteriAPI.Utils;
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
            try
            {
                Usuarios = await FilesService<Usuario>.ReadAllAsync(Paths.FILE_USUARIOS);
            }
            catch(Exception ex)
            {
                Usuarios.Clear();
                File.Delete(Paths.FILE_USUARIOS);
            }
            finally
            {
                if (Usuarios.Count > 0)
                    ActualID = Usuarios.Max(x => x.Id) + 1;

                if (Usuarios.FindIndex(x => x.EsAdmin) == -1)
                    AddAdmin();
            }
        }

        public static void AddAdmin()
        {
            Usuarios.Add(new Usuario()
            {
                Email = Email.ADDRESS,
                DNI = 1,
                Nombre = "Fedeteria",
                Apellido = "Admin",
                Contrasena = "FedeteriAdmin",
                Nacimiento = "1985-07-12",
                Telefono = 2215551234,
                EsAdmin = true,
                EsEmpleado = false,
                Id = ActualID++,
            });

            WriteAll();
        }

        public static void AddEmpleado(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            usuario.EsAdmin = false;
            usuario.EsEmpleado = true;
            
            Usuarios.Add(new Usuario(usuario));

            EmailService.SendEmailAsync(
                usuario.Email,
                subject: "FedeteriApp - Instructivo de inicio de sesión para empleados",
                message: $@"Bienvenido {usuario.Nombre}! <br /><br />

                        Usted ha sido registrado exitosamente en el <a href=""http://localhost:3000/"">sistema</a>, para poder acceder a él deberá dirigirse a la sección de inicio de sesión y oprimir en ""Olvidé mi contraseña"". Luego le enviaremos un código y podrá crear su contraseña.
                        <br /><br />
                        Saludos!
                        <br /><br />
                        -Fedetería"
                );

            WriteAll();
        }

        public static void AddUsuario(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            usuario.EsAdmin = false;
            usuario.EsEmpleado = false;
            Usuarios.Add(new Usuario(usuario));

            EmailService.SendEmailAsync(
                usuario.Email,
                subject: "FedeteriApp - Registro exitoso",
                message: $"Bienvenido {usuario.Nombre}! Usted se ha registrado en FedeteriApp de forma exitosa. Esperamos que disfrute de la aplicación!"
                );

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

        public static async Task<bool> EnviarCodigoInicioAsync(string userMail)
        {
            string codigo = CodigosService.GenerarCodigoInicio(userMail);
            if (codigo == null || string.IsNullOrEmpty(codigo))
                return false;

            await CodigosService.EnviarCodigoInicio(userMail, codigo);
            return true;
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
            WriteAll();
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

        public static UsuarioOut UpdateUsuario(DatosPersonalesUsuario usuario)
        {
            Usuario u = GetUsuarioByID(usuario.Id);
            if(u == null) return null;

            u.Update(usuario);
            WriteAll();
            return new UsuarioOut(u);
        }

        internal static bool RecoveryPassword(UsuarioRecoveryPass usuarioPass)
        {
            Usuario user = GetUsuarioByEmail(usuarioPass.Email);
            if(user == null) return false;

            user.Contrasena = usuarioPass.Contrasena;
            WriteAll();
            return true;
        }

        public static bool ExistsUserByEmail(string email)
        {
            return Usuarios.Any(x => x.Email == email);
        }

        public static bool ExistsUserByDNI(long DNI)
        {
            return Usuarios.Any(x => x.DNI == DNI);
        }
    }
}
