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
                Marca = "Genérica",
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
                Marca = "Genérica",
                Image = "Tijera Cortacero.png",
                Precio = 12500
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

            articulo.Ventas.Add(venta);
            UsuariosService.AddPointsToUser(venta.UsuarioID, PuntosService.AsignarPuntosPorVenta(articulo.Precio));
            WriteAll();
            return true;
        }

        internal static IEnumerable<ArticuloFedeteria> GetArticulosFedeteria()
        {
            return ArticulosFedeteria;
        }
    }
}
