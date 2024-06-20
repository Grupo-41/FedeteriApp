using FedeteriAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class CodigosService
    {
        public static List<CodigoRecuperacion> Codigos = new List<CodigoRecuperacion>();
        public static List<CuponDescuento> Cupones = new List<CuponDescuento>();

        public static void WriteAll() {
            FilesService<CodigoRecuperacion>.WriteAll(Paths.FILE_CODIGOS, Codigos);
            FilesService<CuponDescuento>.WriteAll(Paths.FILE_CUPONES, Cupones);
        }
        public static async Task ReadAllAsync() {
            Codigos = await FilesService<CodigoRecuperacion>.ReadAllAsync(Paths.FILE_CODIGOS);
            Cupones = await FilesService<CuponDescuento>.ReadAllAsync(Paths.FILE_CUPONES);
        }

        public static string GenerarCodigo(string userMail)
        {
            Usuario u = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

            if (u == null)
                return null;

            Random rnd = new Random();
            string codigo = rnd.Next(1000, 10000) + "-" + u.Id.ToString("000");

            Codigos.Add(new CodigoRecuperacion()
            {
                Codigo = codigo,
                UserMail = userMail
            });

            WriteAll();
            return codigo;
        }

        public static string GenerarCodigoInicio(string userMail)
        {
            Usuario u = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

            if (u == null)
                return null;

            Random rnd = new Random();
            string codigo = rnd.Next(1000, 10000).ToString();

            Codigos.Add(new CodigoRecuperacion()
            {
                Codigo = codigo,
                UserMail = userMail
            });

            WriteAll();
            return codigo;
        }

        public static void EnviarCodigo(string userMail, string codigo)
        {
            Usuario usuario = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

            if (usuario == null)
                return;

            EmailService.SendEmail(
                email: userMail,
                subject: "FedeteriApp - Codigo de recuperación",
                message: String.Format("Estimado/a {0}, su código de recuperación es: {1}", usuario.Nombre, codigo)
            );
        }

        public static void EnviarCodigoInicio(string userMail, string codigo)
        {
            Usuario usuario = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

            if (usuario == null)
                return;

            EmailService.SendEmail(
                email: userMail,
                subject: "FedeteriApp - Codigo de inicio de sesión",
                message: String.Format("Estimado/a administrador, su código de inicio de sesión es: {0}", codigo)
            );
        }

        public static bool ValidarCodigo(string userMail, string codigo)
        {
            CodigoRecuperacion c = Codigos.FirstOrDefault(x => x.Codigo == codigo);

            if(c != null && c.UserMail == userMail)
            {
                Codigos.Remove(c);
                WriteAll();
                return true;
            }

            return false;
        }

        public static CuponDescuento GenerarCuponDescuento(int userId, int puntos)
        {
            Random rnd = new Random();
            string codigo = rnd.Next(1000, 10000) + "-" + userId.ToString("000");

            CuponDescuento cupon = new CuponDescuento()
            {
                CodigoCupon = codigo,
                UsuarioID = userId,
                Valor = PuntosService.CalcularDescuento(puntos)
            };

            Cupones.Add(cupon);

            WriteAll();
            return cupon;
        }

        internal static void EnviarCuponDescuento(Usuario usuario, CuponDescuento cupon)
        {
            EmailService.SendEmail(
                email: usuario.Email,
                subject: "FedeteriApp - Cupón de descuento canjeado",
                message: String.Format("Estimado/a {0}, usted acaba de canjear un cupón por ${1} de descuento en su próxima compra. <br/>Su código para canjearlo es: {2}", usuario.Nombre, cupon.Valor, cupon.CodigoCupon)
            );
        }

        public static CuponDescuento ValidarCupon(string codigo)
        {
            CuponDescuento c = Cupones.FirstOrDefault(x => x.CodigoCupon == codigo);

            if (c != null)
            {
                Cupones.Remove(c);
                WriteAll();
                return c;
            }

            return null;
        }
    }
}
