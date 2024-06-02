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
                    HardcodeAdmin();

                if (Usuarios.FindIndex(x => x.EsEmpleado) == -1)
                    HardcodeEmpleado();

                if (Usuarios.FindAll(x => !x.EsAdmin && !x.EsEmpleado).Count() < 3)
                    HardcodeUsers();
            }
        }


        public static void HardcodeAdmin()
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

        public static void HardcodeEmpleado()
        {
            Usuarios.Add(new Usuario(new UsuarioIn()
            {
                Email = "EmpleadoFedeteria@outlook.com",
                DNI = 2,
                Nombre = "Fedeteria",
                Apellido = "Empleado",
                Contrasena = "2",
                Nacimiento = "1997-10-24",
                Telefono = 2215551324,
                EsAdmin = false,
                EsEmpleado = true,
                SucursalID = 1,
                Id = ActualID++,
            }));

            WriteAll();
        }
        
        private static void HardcodeUsers()
        {
            Usuarios.Add(new Usuario(new UsuarioIn()
            {
                Email = "Usuario1Fedeteria@outlook.com",
                DNI = 3,
                Nombre = "John",
                Apellido = "Doe",
                Contrasena = "3",
                Nacimiento = "1990-05-20",
                Telefono = 1234567890,
                SucursalID = 1,
                Id = ActualID++,
            }));

            Usuarios.Add(new Usuario(new UsuarioIn()
            {
                Email = "Usuario2Fedeteria@outlook.com",
                DNI = 4,
                Nombre = "Jane",
                Apellido = "Smith",
                Contrasena = "4",
                Nacimiento = "1988-12-15",
                Telefono = 9876543210,
                SucursalID = 2,
                Id = ActualID++,
            }));

            Usuarios.Add(new Usuario(new UsuarioIn()
            {
                Email = "user3@fedeteriapp.com",
                DNI = 5,
                Nombre = "Alice",
                Apellido = "Johnson",
                Contrasena = "5",
                Nacimiento = "1982-03-10",
                Telefono = 5556667777,
                SucursalID = 3,
                Id = ActualID++,
            }));

            Usuarios.Add(new Usuario(new UsuarioIn()
            {
                Email = "user4@fedeteriapp.com",
                DNI = 6,
                Nombre = "Maria",
                Apellido = "Gonzalez",
                Contrasena = "6",
                Nacimiento = "1995-09-28",
                Telefono = 777888999,
                SucursalID = 4,
                Id = ActualID++,
            }));

            AddArticuloDeseado(4, new ArticuloDeseado() { Descripcion = "Motosierra", Marca = "STIHL" });
            AddArticuloDeseado(4, new ArticuloDeseado() { Descripcion = "Adhesivo", Marca = "Eccole" });
            AddArticuloDeseado(4, new ArticuloDeseado() { Descripcion = "Caja de herramientas", Marca = "STANLEY" });

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

        public static IEnumerable<ArticuloDeseado> GetArticulosDeseados(int userId)
        {
            Usuario u = GetUsuarioByID(userId); if (u == null) return null;

            return u.ListaDeDeseos;
        }

        public static bool AddArticuloDeseado(int userId, ArticuloDeseado articulo)
        {
            Usuario u = GetUsuarioByID(userId);
            if(u == null) return false;

            if (u.ListaDeDeseos.FindIndex(x => x.Marca == articulo.Marca && x.Descripcion == articulo.Descripcion) != -1)
                return false;

            if(u.ListaDeDeseos == null)
                u.ListaDeDeseos = new List<ArticuloDeseado>();

            u.ListaDeDeseos.Add(articulo);
            WriteAll();
            return true;
        }

        public static bool DeleteArticuloDeseado(int userId, int id)
        {
            Usuario u = GetUsuarioByID(userId); if (u == null) return false;

            u.ListaDeDeseos.RemoveAt(id);
            WriteAll();
            return true;
        }

        public static void AddPointsToUser(int userId, int points)
        {
            Usuario u = GetUsuarioByID(userId); if (u == null) return;

            u.AddPoints(points);
            WriteAll();
        }
    }
}
