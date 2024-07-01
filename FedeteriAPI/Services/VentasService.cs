using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class VentasService
    {
        private static List<ArticuloFedeteria> ArticulosFedeteria = new List<ArticuloFedeteria>();
        private static int ActualID = 0;

        public static void WriteAll() => FilesService<ArticuloFedeteria>.WriteAll(Paths.FILE_ARTICULOS_FEDETERIA, ArticulosFedeteria);
        public static async Task ReadAllAsync()
        {
            ArticulosFedeteria = await FilesService<ArticuloFedeteria>.ReadAllAsync(Paths.FILE_ARTICULOS_FEDETERIA);

            if (ArticulosFedeteria.Count > 0)
                ActualID = ArticulosFedeteria.Max(x => x.Id) + 1;

            if (ArticulosFedeteria.Count < 5)
                HardcodeArticulosFedeteria();
        }

        public static void HardcodeArticulosFedeteria()
        {
            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Lubricante",
                Marca = "WD-40",
                Image = "WD-40.jpg",
                Precio = 6500
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Alargue Zapatilla 3m",
                Marca = "Genérico",
                Image = "Alargue Zapatilla 3m.jpg",
                Precio = 10000
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Caja de herramientas",
                Marca = "STANLEY",
                Image = "Caja de herramientas.png",
                Precio = 35000
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Flexible de agua mallado",
                Marca = "Genérico",
                Image = "Flexible Agua Mallado.webp",
                Precio = 7500
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Adhesivo",
                Marca = "Eccole",
                Image = "Eccole.webp",
                Precio = 8000
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Guantes de trabajo",
                Marca = "Genéricos",
                Image = "Guantes de Trabajo.webp",
                Precio = 15000
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Hacha de mano",
                Marca = "Genérico",
                Image = "Hacha de mano.png",
                Precio = 40000
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Serrucho",
                Marca = "STANLEY",
                Image = "Serrucho.png",
                Precio = 22500
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Sierra Caladora",
                Marca = "Black&Decker",
                Image = "Sierra Caladora.png",
                Precio = 47500
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Sopla Aspiradora",
                Marca = "STANLEY",
                Image = "Sopla Aspiradora.png",
                Precio = 27500
            });

            AddArticulo(new ArticuloFedeteria()
            {
                Descripcion = "Tijera Cortacero",
                Marca = "Genérico",
                Image = "Tijera Cortacero.png",
                Precio = 12500
            });

            PostVenta(2, new Venta()
            {
                Cantidad = 2,
                TruequeID = 17,
                UsuarioID = 4,
            });

            PostVenta(5, new Venta()
            {
                Cantidad = 5,
                TruequeID = 20,
                UsuarioID = 2,
            });

            PostVenta(1, new Venta()
            {
                Cantidad = 3,
                TruequeID = 17,
                UsuarioID = 5,
            });

            PostVenta(7, new Venta()
            {
                Cantidad = 7,
                TruequeID = 17,
                UsuarioID = 2,
            });

            PostVenta(8, new Venta()
            {
                Cantidad = 1,
                TruequeID = 20,
                UsuarioID = 3,
            });

            PostVenta(4, new Venta()
            {
                Cantidad = 5,
                TruequeID = 18,
                UsuarioID = 5,
            });

            PostVenta(6, new Venta()
            {
                Cantidad = 3,
                TruequeID = 18,
                UsuarioID = 2,
            });

            PostVenta(10, new Venta()
            {
                Cantidad = 8,
                TruequeID = 19,
                UsuarioID = 4,
            });

            PostVenta(7, new Venta()
            {
                Cantidad = 2,
                TruequeID = 19,
                UsuarioID = 3,
            });

            PostVenta(3, new Venta()
            {
                Cantidad = 3,
                TruequeID = 23,
                UsuarioID = 5,
            });

            PostVenta(1, new Venta()
            {
                Cantidad = 3,
                TruequeID = 23,
                UsuarioID = 5,
            });

            PostVenta(2, new Venta()
            {
                Cantidad = 3,
                TruequeID = 23,
                UsuarioID = 3,
            });

            PostVenta(5, new Venta()
            {
                Cantidad = 3,
                TruequeID = 23,
                UsuarioID = 3,
            });

            PostVenta(7, new Venta()
            {
                Cantidad = 1,
                TruequeID = 23,
                UsuarioID = 3,
            });

            PostVenta(5, new Venta()
            {
                Cantidad = 8,
                TruequeID = 21,
                UsuarioID = 4,
            });

            PostVenta(3, new Venta()
            {
                Cantidad = 5,
                TruequeID = 21,
                UsuarioID = 3,
            });
        }

        private static void AddArticulo(ArticuloFedeteria articulo)
        {
            articulo.Id = ActualID++;
            ArticulosFedeteria.Add(articulo);
        }

        public static ArticuloFedeteria GetArticuloFedeteria(int id)
        {
            return ArticulosFedeteria.FirstOrDefault(x => x.Id == id);
        }

        public static bool PostVenta(int articuloId, Venta venta)
        {
            ArticuloFedeteria articulo = GetArticuloFedeteria(articuloId);
            if (articulo == null) return false;

            venta.Fecha = DateOnly.FromDateTime(DateTime.Now);
            venta.MontoTotal = venta.Cantidad * articulo.Precio;
            articulo.Ventas.Add(venta);

            for(int i = 0; i < venta.Cantidad; i++)
                UsuariosService.AddPointsToUser(venta.UsuarioID, PuntosService.AsignarPuntosPorVenta(articulo.Precio));

            WriteAll();
            return true;
        }

        internal static IEnumerable<ArticuloFedeteria> GetArticulosFedeteria()
        {
            return ArticulosFedeteria;
        }

        public static IEnumerable<Venta> GetVentasBySucursal(int id)
        {
            List<Venta> ventas = new List<Venta>();

            foreach(ArticuloFedeteria a in ArticulosFedeteria)
                ventas.AddRange(a.Ventas);

            return ventas.Where(x => TruequesService.Get(x.TruequeID).Sucursal.Id == id);
        }
    }
}
