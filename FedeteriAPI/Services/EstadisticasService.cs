using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class EstadisticasService
    {
        public static IEnumerable<VentasPorSucursal> GetVentasPorSucursal(DateOnly? inicio = null, DateOnly? fin = null)
        {
            List<VentasPorSucursal> res = new List<VentasPorSucursal>();

            foreach(Sucursal s in SucursalesService.GetSucursals())
            {
                VentasPorSucursal ventasPorSucursal = new VentasPorSucursal();
                ventasPorSucursal.Sucursal = s;
                ventasPorSucursal.Ventas = VentasService.GetVentasBySucursal(s.Id).ToList();

                if (inicio.HasValue && fin.HasValue)
                    ventasPorSucursal.Ventas = ventasPorSucursal.Ventas.Where(x => x.Fecha.Value.CompareTo(inicio) >= 0 && x.Fecha.Value.CompareTo(fin) < 0).ToList();

                ventasPorSucursal.MontoTotal = ventasPorSucursal.Ventas.Sum(x => x.MontoTotal);
            }

            return res;
        }

        public static EstadisticaDestacados GetDestacadosPorFecha(DateOnly? inicio = null, DateOnly? fin = null)
        {
            List<Destacado> destacados = ArticulosService.GetDestacados().ToList();

            if (inicio.HasValue && fin.HasValue)
                destacados = destacados.Where(x => x.Comienzo.CompareTo(inicio) >= 0 && x.Comienzo.CompareTo(fin) < 0).ToList();

            return new EstadisticaDestacados()
            {
                Count = destacados.Count,
                MontoTotal = destacados.Sum(x => x.Monto())
            };
        }

        public static List<TruequeOut> GetTruequesPorFecha(DateOnly? inicio = null, DateOnly? fin = null)
        {
            List<TruequeOut> trueques = TruequesService.GetRealizados().ToList();

            if (inicio.HasValue && fin.HasValue)
                trueques = trueques.Where(x => x.FechaRealizacion.Value.CompareTo(inicio) >= 0 && x.FechaRealizacion.Value.CompareTo(fin) < 0).ToList();

            return trueques;
        }
    }

    public class VentasPorSucursal
    {
        public Sucursal Sucursal { get; set; }
        public List<Venta> Ventas { get; set; }
        public int MontoTotal { get; set; }
    }

    public class EstadisticaDestacados
    {
        public int Count { get; set; }
        public double MontoTotal { get; set; }
    }
}
