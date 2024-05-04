using CinemaNightAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class EmpleadosService
    {

        public static List<Usuario> GetEmpleados()
        {
            return UsuariosService.GetEmpleados();
        }

        public static Usuario GetEmpleadoByID(int id)
        {
            return GetEmpleados().FirstOrDefault(x => x.Id == id);
        }

        public static void AddEmpleado(UsuarioIn usuario)
        {
            UsuariosService.AddEmpleado(usuario);
        }
    }
}
