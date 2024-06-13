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

            if(Trueques.Count < 20)
                HardcodeTrueques();
        }

        private static void HardcodeTrueques()
        {
            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 0,
                ArticuloSolicitadoID = 19
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 1,
                ArticuloSolicitadoID = 17
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 19,
                ArticuloSolicitadoID = 5
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 2,
                ArticuloSolicitadoID = 9
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 3,
                ArticuloSolicitadoID = 13
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 6,
                ArticuloSolicitadoID = 8
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 0,
                ArticuloSolicitadoID = 12
            }, true, 1, false, DateOnly.FromDateTime(new DateTime(2024, 5, 6)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 1,
                ArticuloSolicitadoID = 11
            }, true, 1, false, DateOnly.FromDateTime(new DateTime(2024, 6, 17)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 2,
                ArticuloSolicitadoID = 10
            }, true, 3, false, DateOnly.FromDateTime(new DateTime(2024, 2, 22)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 3,
                ArticuloSolicitadoID = 17
            }, true, 3, false, DateOnly.FromDateTime(new DateTime(2023, 12, 14)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 5,
                ArticuloSolicitadoID = 16
            }, true, 4, false, DateOnly.FromDateTime(new DateTime(2024, 3, 27)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 4,
                ArticuloSolicitadoID = 7
            }, true, 4, false, DateOnly.FromDateTime(new DateTime(2024, 4, 7)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 13,
                ArticuloSolicitadoID = 14
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 7,
                ArticuloSolicitadoID = 4
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 1,
                ArticuloSolicitadoID = 17
            }, false);

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 8,
                ArticuloSolicitadoID = 15
            }, true, 5, false, DateOnly.FromDateTime(new DateTime(2024, 2, 1)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 9,
                ArticuloSolicitadoID = 10
            }, true, 5, false, DateOnly.FromDateTime(new DateTime(2024, 1, 18)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 0,
                ArticuloSolicitadoID = 18
            }, true, 2, true, DateOnly.FromDateTime(new DateTime(2024, 5, 10)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 1,
                ArticuloSolicitadoID = 17
            }, true, 4, true, DateOnly.FromDateTime(new DateTime(2024, 4, 20)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 6,
                ArticuloSolicitadoID = 14
            }, true, 3, true, DateOnly.FromDateTime(new DateTime(2024, 3, 23)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 4,
                ArticuloSolicitadoID = 7
            }, true, 3, true, DateOnly.FromDateTime(new DateTime(2024, 5, 2)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 8,
                ArticuloSolicitadoID = 12
            }, true, 4, true, DateOnly.FromDateTime(new DateTime(2023, 12, 22)));

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 3,
                ArticuloSolicitadoID = 13
            });

            AddHardcodedTrueque(new TruequeIn()
            {
                ArticuloOfrecidoID = 5,
                ArticuloSolicitadoID = 15
            }, true, 2, true, DateOnly.FromDateTime(new DateTime(2024, 1, 29)));
        }

        private static void AddHardcodedTrueque(TruequeIn trueque, bool? aceptado = null, int sucursalId = 0, bool? realizado = false, DateOnly? date = null)
        {
            AddTrueque(trueque);

            if (aceptado.HasValue)
                SetTruequeAceptado(ActualID - 1, aceptado.Value, true);

            if (aceptado.HasValue && aceptado.Value)
            {
                UpdateSucursal(ActualID - 1, sucursalId);

                if(realizado.HasValue)
                    ValidateTrueque(ActualID - 1, realizado.Value, date);
            }
        }

        public static IEnumerable<TruequeOut> GetAll()
        {
            return Trueques;
        }

        public static IEnumerable<TruequeOut> GetAceptados()
        {
            return Trueques.Where(x => x.Aceptado.HasValue && x.Aceptado.Value);
        }

        public static IEnumerable<TruequeOut> GetRealizados()
        {
            return GetAceptados().Where(x => x.Realizado.HasValue && x.Realizado.Value).OrderByDescending(x => x.FechaRealizacion);
        }

        public static IEnumerable<TruequeOut> GetTruequesByUsuario(int userId)
        {
            return Trueques.Where(x => x.ArticuloSolicitado.Usuario.Id == userId || x.ArticuloOfrecido.Usuario.Id == userId);
        }

        public static IEnumerable<TruequeOut> GetPropuestasByUsuario(int userId)
        {
            return Trueques.Where(x => x.ArticuloSolicitado.Usuario.Id == userId && !x.Aceptado.HasValue);
        }

        public static IEnumerable<TruequeOut> GetTruequesPendientesByUsuario(int userId)
        {
            return GetTruequesByUsuario(userId).Where(x => x.Aceptado.HasValue && x.Aceptado.Value);
        }

        public static IEnumerable<TruequeOut> GetTruequesPendientesBySucursal(int sucursalId)
        {
            return Trueques.Where(x => x.Aceptado.HasValue && x.Aceptado.Value && x.Sucursal != null && x.Sucursal.Id == sucursalId);
        }

        public static bool AddTrueque(TruequeIn newTrueque)
        {
            if (TruequesFile.Any(x => x.ArticuloOfrecidoID == newTrueque.ArticuloOfrecidoID && x.ArticuloSolicitadoID == newTrueque.ArticuloSolicitadoID && !x.Aceptado.HasValue))
                return false;

            ArticulosService.GetArticulo(newTrueque.ArticuloOfrecidoID).Truequeado = true;
            ArticulosService.GetArticulo(newTrueque.ArticuloSolicitadoID).Truequeado = true;
            ArticulosService.WriteAll();

            Trueque t = new Trueque(newTrueque);
            t.Id = ActualID++;
            TruequesFile.Add(t);
            Trueques.Add(new TruequeOut(t));
            WriteAll();
            return true;
        }

        private static TruequeOut GetTruequeById(int truequeId) {
            return Trueques.FirstOrDefault(x => x.Id == truequeId);
        }

        private static Trueque GetTruequeFileById(int truequeId)
        {
            return TruequesFile.FirstOrDefault(x => x.Id == truequeId);
        }

        public static void ValidateTrueque(int truequeId, bool done, DateOnly? dateOnly = null)
        {
            TruequeOut t = GetTruequeById(truequeId);
            Trueque tFile = GetTruequeFileById(truequeId);

            if (t != null && tFile != null)
            {
                t.ArticuloSolicitado.Truequeado = done;
                t.ArticuloOfrecido.Truequeado = done;
                t.Realizado = done;
                t.FechaRealizacion = dateOnly.HasValue ? dateOnly.Value : DateOnly.FromDateTime(DateTime.Now);
                tFile.Realizado = done;
                tFile.FechaRealizacion = dateOnly.HasValue ? dateOnly.Value : DateOnly.FromDateTime(DateTime.Now);
                ArticulosService.WriteAll();
                WriteAll();
            }
        }

        private static async void SetTruequeAceptado(int truequeId, bool aceptado, bool hardcoded = false)
        {
            TruequeOut t = GetTruequeById(truequeId);
            Trueque tFile = GetTruequeFileById(truequeId);

            if (t != null && tFile != null)
            {
                t.ArticuloOfrecido.Truequeado = aceptado;
                t.ArticuloSolicitado.Truequeado = aceptado;
                t.Aceptado = aceptado;
                tFile.Aceptado = aceptado;
                ArticulosService.WriteAll();
                WriteAll();
            }

            if (hardcoded)
                return;

            await EmailService.SendEmailAsync(t.ArticuloOfrecido.Usuario.Email,
                                        aceptado ? "Trueque aceptado - FedeteriApp" : "Trueque rechazado - FedeteriApp",
                                        aceptado ? String.Format("Aceptaron tu propuesta de trueque por tu artículo {0}. Ponete en contacto con {1} para elegir la sucursal en la que realizarán el trueque antes de cargarlo en la aplicación, a través de su email: {2}", 
                                        t.ArticuloOfrecido.Descripcion, t.ArticuloSolicitado.Usuario.Nombre, t.ArticuloSolicitado.Usuario.Email)
                                        : String.Format("Rechazaron tu propuesta de trueque por tu artículo {0}. Mayor suerte la próxima!", t.ArticuloOfrecido.Descripcion));

            await EmailService.SendEmailAsync(t.ArticuloSolicitado.Usuario.Email,
                                        aceptado ? "Trueque aceptado - FedeteriApp" : "Trueque rechazado - FedeteriApp",
                                        aceptado ? String.Format("Aceptaste la propuesta de trueque por tu artículo {0}. Ponete en contacto con {1} para elegir la sucursal en la que realizarán el trueque antes de cargarlo en la aplicación, a través de su email: {2}",
                                        t.ArticuloSolicitado.Descripcion, t.ArticuloOfrecido.Usuario.Nombre, t.ArticuloOfrecido.Usuario.Email)
                                        : String.Format("Rechazaste la propuesta de trueque por tu artículo {0} exitosamente.", t.ArticuloSolicitado.Descripcion));
        }

        public static void AceptarTrueque(int truequeId)
        {
            SetTruequeAceptado(truequeId, true);
        }

        public static void RechazarTrueque(int truequeId)
        {
            SetTruequeAceptado(truequeId, false);
        }

        public static void UpdateSucursal(int truequeId, int sucursalId)
        {
            TruequeOut t = GetTruequeById(truequeId);
            Trueque tFile = GetTruequeFileById(truequeId);

            t.Sucursal = SucursalesService.GetSucursal(sucursalId);
            tFile.SucursalID = sucursalId;

            WriteAll();
        }

        internal static IEnumerable<TruequeOut> GetPendientes()
        {
            return GetAceptados().Where(x => !x.Realizado.HasValue);
        }
    }
}
