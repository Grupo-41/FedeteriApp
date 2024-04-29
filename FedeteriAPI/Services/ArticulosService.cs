using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class ArticulosService
    {
        static List<ArticuloOut> Articulos = new List<ArticuloOut>();
        static int ActualID = 0;

        public static List<ArticuloOut> GetArticulos()
        {
            return Articulos;
        }

        public static void AddArticulo(int userID, ArticuloIn articulo)
        {
            ArticuloOut nuevoArticulo = new ArticuloOut(articulo)
            {
                Id = ActualID++,
                Usuario = new UsuarioOut(UsuariosService.GetUsuarioByID(userID)),
            };

            Articulos.Add(nuevoArticulo);
        }

        public static List<ArticuloOut> GetArticulosByUsuario(int userId)
        {
            return Articulos.FindAll(x => x.Usuario.Id == userId);
        }

        public static void UpdateArticulo(int id, ArticuloIn articulo)
        {
            ArticuloOut toUpdate = Articulos.FirstOrDefault(x => x.Id == id);
            
            if (toUpdate != null)
            {
                toUpdate.Descripcion = articulo.Descripcion;
                toUpdate.Estado = articulo.Estado;
                toUpdate.ImagenURLs = articulo.ImagenURLs;
                toUpdate.PrecioEstimado = articulo.PrecioEstimado;
            }
        }

        public static void DeleteArticulo(int id)
        {
            int index = Articulos.FindIndex(x => x.Id == id);

            if(index == -1)
                Articulos.RemoveAt(index);
        }

        public static ArticuloOut GetArticulo(int id)
        {
            return Articulos.FirstOrDefault(x => x.Id == id);
        }

        public static IEnumerable<ArticuloOut> GetArticulosTasados()
        {
            return Articulos.FindAll(x => x.Tasado);
        }

        public static IEnumerable<ArticuloOut> GetArticulosATasar()
        {
            return Articulos.FindAll(x => !x.Tasado);
        }

        public static bool TasarArticulo(int articuloID, double precio)
        {
            ArticuloOut aTasar = GetArticulo(articuloID);

            if (aTasar == null)
                return false;
            else
            {
                aTasar.PrecioEstimado = precio;
                aTasar.Tasado = true;
                return true;
            }
        }
    }
}
