using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class CalificacionesService
    {
        public static List<CalificacionUsuario> CalificacionUsuarios { get; set; }
        public static List<CalificacionSucursal> CalificacionSucursales { get; set; }

        public static void WriteAll()
        {
            FilesService<CalificacionUsuario>.WriteAll(Paths.FILE_CALIFICACIONES_USUARIOS, CalificacionUsuarios);
            FilesService<CalificacionSucursal>.WriteAll(Paths.FILE_CALIFICACIONES_SUCURSALES, CalificacionSucursales);
        }

        public static async Task ReadAllAsync()
        {
            CalificacionUsuarios = await FilesService<CalificacionUsuario>.ReadAllAsync(Paths.FILE_CALIFICACIONES_USUARIOS);
            CalificacionSucursales = await FilesService<CalificacionSucursal>.ReadAllAsync(Paths.FILE_CALIFICACIONES_SUCURSALES);
        }

        public static void CalificarUsuario(int usuarioCalificanteID, int usuarioCalificadoID, int truequeAsociadoID, int calificacion, string descripcion)
        {
            CalificacionUsuario calificacionUsuario = new CalificacionUsuario() {
                UsuarioID = usuarioCalificanteID,
                UsuarioCalificadoID = usuarioCalificadoID,
                TruequeID = truequeAsociadoID,
                Rating = calificacion,
                Descripcion = descripcion
            };

            CalificacionUsuarios.Add(calificacionUsuario);
            WriteAll();
        }

        public static void CalificarSucursal(int usuarioCalificanteID, int sucursalCalificadaID, int truequeAsociadoID, int calificacion, string descripcion)
        {
            CalificacionSucursal calificacionSucursal = new CalificacionSucursal()
            {
                UsuarioID = usuarioCalificanteID,
                SucursalCalificadaID = sucursalCalificadaID,
                TruequeID = truequeAsociadoID,
                Rating = calificacion,
                Descripcion = descripcion
            };

            CalificacionSucursales.Add(calificacionSucursal);
            WriteAll();
        }
    }
}
