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

            if(CalificacionSucursales.Count < 5)
                HardcodeSucursalCalifications();

        }

        private static void HardcodeSucursalCalifications()
        {
            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 5,
                Rating = 4
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 5,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 4,
                Rating = 4
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 4,
                Rating = 4
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 4,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 3,
                Rating = 3
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 3,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 3,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 2,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 2,
                Rating = 3
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 2,
                Rating = 3
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 1,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 1,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 1,
                Rating = 5
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 1,
                Rating = 4
            });

            CalificacionSucursales.Add(new CalificacionSucursal()
            {
                SucursalCalificadaID = 0,
                Rating = 4
            });

            WriteAll();
        }

        internal static IEnumerable<CalificacionSucursalResult> GetCalificacionesSucursales()
        {
            List<CalificacionSucursalResult> results = new List<CalificacionSucursalResult>();

            foreach(Sucursal s in SucursalesService.GetSucursals())
            {
                CalificacionSucursalResult res = new CalificacionSucursalResult();
                var calificaciones = CalificacionSucursales.Where(x => x.SucursalCalificadaID == s.Id);

                res.Sucursal = s;
                res.Votantes = calificaciones.Count();
                res.Rating = calificaciones.Count() > 0 ? calificaciones.Average(x => x.Rating) : 0;
                results.Add(res);
            }

            return results;
        }

        internal static IEnumerable<CalificacionUsuarioResult> GetCalificacionesUsuarios()
        {
            List<CalificacionUsuarioResult> results = new List<CalificacionUsuarioResult>();

            foreach (Usuario u in UsuariosService.GetUsuarios())
            {
                CalificacionUsuarioResult res = new CalificacionUsuarioResult();
                var calificaciones = CalificacionUsuarios.Where(x => x.UsuarioCalificadoID == u.Id);

                res.Usuario = u;
                res.Votantes = calificaciones.Count();
                res.Rating = calificaciones.Average(x => x.Rating);
                results.Add(res);
            }

            return results;
        }

        internal static CalificacionUsuarioResult GetCalificacionUsuario(int id)
        {
            CalificacionUsuarioResult res = new CalificacionUsuarioResult();
            res.Usuario = UsuariosService.GetUsuarioByID(id);

            if (res.Usuario == null)
                return null;

            var calificaciones = GetCalificacionesUsuario(id);

            res.Votantes = calificaciones.Count();
            res.Rating = calificaciones.Average(x => x.Rating);

            return res;
        }

        internal static IEnumerable<CalificacionUsuario> GetCalificacionesUsuario(int id)
        {
            return CalificacionUsuarios.Where(x => x.UsuarioCalificadoID == id);
        }

        internal static IEnumerable<CalificacionSucursal> GetCalificacionesSucursal(int id)
        {
            return CalificacionSucursales.Where(x => x.SucursalCalificadaID == id); 
        }

        internal static void CalificarSucursal(CalificacionSucursal calificacion)
        {
            int alreadyVoted = CalificacionSucursales.FindIndex(x => x.TruequeID == calificacion.TruequeID && x.UsuarioID == calificacion.UsuarioID);

            if (alreadyVoted != -1)
                CalificacionSucursales.RemoveAt(alreadyVoted);

            CalificacionSucursales.Add(calificacion);
            WriteAll();
        }

        internal static void CalificarUsuario(CalificacionUsuario calificacion)
        {
            UsuarioOut u = UsuariosService.GetUsuarioByID(calificacion.UsuarioCalificadoID);
            if (u == null) return;

            CalificacionUsuario alreadyVoted = CalificacionUsuarios.Find(x => x.TruequeID == calificacion.TruequeID && x.UsuarioID == calificacion.UsuarioID);

            if (alreadyVoted != null)
            {
                UsuariosService.SubPointsToUser(calificacion.UsuarioCalificadoID, calificacion.Rating);
                CalificacionUsuarios.Remove(alreadyVoted);
            }

            UsuariosService.AddPointsToUser(calificacion.UsuarioCalificadoID, calificacion.Rating);
            CalificacionUsuarios.Add(calificacion);
            WriteAll();
        }

        internal static bool TruequeCalificadoByUsuario(int userId, int truequeId)
        {
            CalificacionSucursal? cSucursal = CalificacionSucursales.Find(x => x.TruequeID == truequeId && x.UsuarioID == userId);
            CalificacionUsuario? cUsuario = CalificacionUsuarios.Find(x => x.TruequeID == truequeId && x.UsuarioID == userId);

            return cSucursal != null && cUsuario != null;
        }
    }
}
