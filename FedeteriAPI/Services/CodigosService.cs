using CinemaNightAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class CodigosService
    {
        public static List<CodigoRecuperacion> Codigos = new List<CodigoRecuperacion>();
        public static void WriteAll() => FilesService<CodigoRecuperacion>.WriteAll(Paths.FILE_CODIGOS, Codigos);
        public static async Task ReadAllAsync() => Codigos = await FilesService<CodigoRecuperacion>.ReadAllAsync(Paths.FILE_CODIGOS);

        public static string GenerarCodigo(string userMail)
        {
            UsuarioIn u = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

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

        public static async Task EnviarCodigo(string userMail, string codigo)
        {
            UsuarioIn usuario = UsuariosService.GetUsuarios().FirstOrDefault(x => x.Email == userMail);

            if (usuario == null)
                return;

            await EmailService.SendEmailAsync(
                email: userMail,
                subject: "FedeteriApp - Codigo de recuperación",
                message: String.Format("Estimado/a {0}, su código de recuperación es: {1}", usuario.Nombre, codigo)
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
    }
}
