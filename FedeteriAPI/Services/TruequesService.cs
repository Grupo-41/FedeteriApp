using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public class TruequesService
    {
        static List<Trueque> Trueques { get; set; }
        static int ActualID = 0;

        public static void WriteAll() => FilesService<Trueque>.WriteAll(Paths.FILE_TRUEQUES, Trueques);
        public static async Task ReadAllAsync()
        {
            Trueques = await FilesService<Trueque>.ReadAllAsync(Paths.FILE_TRUEQUES);

            if (Trueques.Count > 0)
                ActualID = Trueques.Max(x => x.Id) + 1;
        }

        public static IEnumerable<Trueque> GetAll()
        {
            return Trueques;
        }

        public static IEnumerable<Trueque> GetTruequesByUsuario(int userId)
        {
            return Trueques.Where(x => x.UsuarioSolicitado.Id == userId);
        }

        public static IEnumerable<Trueque> GetTruequesPendientesBySucursal(int sucursalId)
        {
            return Trueques.Where(x => x.Aceptado.HasValue && x.Aceptado.Value && x.Sucursal.Id == sucursalId);
        }

        public static void AddTrueque(TruequeIn newTrueque)
        {
            Trueque t = new Trueque(newTrueque);
            Trueques.Add(t);
            WriteAll();
        }
    }
}
