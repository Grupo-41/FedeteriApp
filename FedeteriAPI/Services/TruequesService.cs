using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public class TruequesService
    {
        static List<Trueque> TruequesFile { get; set; } = new List<Trueque>();
        static List<TruequeOut> Trueques { get; set; } = new List<TruequeOut>();

        static int ActualID = 0;

        public static void WriteAll() => FilesService<Trueque>.WriteAll(Paths.FILE_TRUEQUES, TruequesFile);
        public static async Task ReadAllAsync()
        {
            TruequesFile = await FilesService<Trueque>.ReadAllAsync(Paths.FILE_TRUEQUES);

            if (TruequesFile.Count > 0)
                ActualID = TruequesFile.Max(x => x.Id) + 1;

            Trueques = TruequesFile.Select(x => new TruequeOut(x)).ToList();
        }

        public static IEnumerable<TruequeOut> GetAll()
        {
            return Trueques;
        }

        public static IEnumerable<TruequeOut> GetTruequesByUsuario(int userId)
        {
            return Trueques.Where(x => x.ArticuloSolicitado.Usuario.Id == userId || x.ArticuloOfrecido.Usuario.Id == userId);
        }

        public static IEnumerable<TruequeOut> GetTruequesPendientesBySucursal(int sucursalId)
        {
            return Trueques.Where(x => x.Aceptado.HasValue && x.Aceptado.Value && x.Sucursal.Id == sucursalId);
        }

        public static void AddTrueque(TruequeIn newTrueque)
        {
            Trueque t = new Trueque(newTrueque);
            t.Id = ActualID++;
            TruequesFile.Add(t);
            Trueques.Add(new TruequeOut(t));
            WriteAll();
        }
    }
}
