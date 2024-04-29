using FedeteriAPI.Models;
using FedeteriAPI.Utils;

namespace FedeteriAPI.Services
{
    public static class CodigosService
    {
        static List<CodigoRecuperacion> Codigos = new List<CodigoRecuperacion>();

        public static string GenerarCodigo(int userID)
        {
            Random rnd = new Random();
            string codigo = rnd.Next(1000, 10000) + "/" + userID.ToString("000");

            Codigos.Add(new CodigoRecuperacion()
            {
                UserID = userID,
                Codigo = codigo
            });

            return codigo;
        }

        public static async Task EnviarCodigo(int userID, string codigo)
        {
            UsuarioIn usuario = UsuariosService.GetUsuarioByID(userID);

            await EmailService.SendEmailAsync(
                email: usuario.Email,
                subject: "FedeteriApp - Codigo de recuperación",
                message: String.Format("Estimado/a {0}, su código de recuperación es: {1}", usuario.Nombre, codigo)
            );
        }
    }
}
