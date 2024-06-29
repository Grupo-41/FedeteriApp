using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class EstadisticasService
    {
        public static IEnumerable<VentasPorSucursal> GetVentasPorSucursal()
        {
            List<VentasPorSucursal> res = new List<VentasPorSucursal>();

            foreach(Sucursal s in SucursalesService.GetSucursals())
            {
                VentasPorSucursal ventasPorSucursal = new VentasPorSucursal();
                ventasPorSucursal.Sucursal = s;
                ventasPorSucursal.Ventas = VentasService.GetVentasBySucursal(s.Id).ToList();
                ventasPorSucursal.MontoTotal = ventasPorSucursal.Ventas.Sum(x => x.MontoTotal);
            }

            return res;
        }

        public static EstadisticaDestacados GetDestacadosPorFecha(DateOnly comienzo, DateOnly fin)
        {
            List<Destacado> destacados = ArticulosService.GetDestacados().Where(x => x.Comienzo.CompareTo(comienzo) >= 0 && x.Comienzo.CompareTo(fin) < 0).ToList();

            return new EstadisticaDestacados()
            {
                Count = destacados.Count,
                MontoTotal = destacados.Sum(x => x.Monto())
            };
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
