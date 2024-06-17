using FedeteriAPI.Utils;
using FedeteriAPI.Models;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class ArticulosService
    {
        static List<ArticuloOut> Articulos = new List<ArticuloOut>();
        static int ActualID = 0;

        public static void WriteAll() => FilesService<ArticuloOut>.WriteAll(Paths.FILE_ARTICULOS, Articulos);
        public static async Task ReadAllAsync()
        {
            Articulos = await FilesService<ArticuloOut>.ReadAllAsync(Paths.FILE_ARTICULOS);

            if(Articulos.Count > 0)
                ActualID = Articulos.Max(x => x.Id) + 1;

            if (Articulos.Count < 5)
                HardcodeArticles();
        }

        private static void HardcodeArticles()
        {
            AddHardcodedArticulo(2, new ArticuloIn()
            {
                Descripcion = "Llave Criquet",
                Marca = "BREMEN",
                Estado = "Usado"
            }, ["Llave Criquet.jpg"], 15000);

            AddHardcodedArticulo(2, new ArticuloIn()
            {
                Descripcion = "Lijadora de Palma",
                Marca = "Black&Decker",
                Estado = "Usado"
            }, ["Lijadora de Palma.png"], 50000);

            AddHardcodedArticulo(2, new ArticuloIn()
            {
                Descripcion = "Flexible Agua Mallado",
                Marca = "Genérico",
                Estado = "Nuevo"
            }, ["Flexible Agua Mallado.webp"], 5000);

            AddHardcodedArticulo(2, new ArticuloIn()
            {
                Descripcion = "Motosierra",
                Marca = "STIHL",
                Estado = "Nuevo"
            }, ["Motosierra.jpg"], 50000);

            AddHardcodedArticulo(2, new ArticuloIn()
            {
                Descripcion = "Stillson",
                Marca = "Genérica",
                Estado = "Usado"
            }, ["Llave Stillson.jpg"], 25000);

            AddHardcodedArticulo(3, new ArticuloIn()
            {
                Descripcion = "Llave Francesa",
                Marca = "BAHCO",
                Estado = "Usado"
            }, ["Llave Francesa.jpg"], 15000);

            AddHardcodedArticulo(3, new ArticuloIn()
            {
                Descripcion = "Kit Tubos Llaves",
                Marca = "STANLEY",
                Estado = "Usado"
            }, ["Kit Tubos Llaves.jpg"], 50000);

            AddHardcodedArticulo(3, new ArticuloIn()
            {
                Descripcion = "Caja de herramientas",
                Marca = "STANLEY",
                Estado = "Usado"
            }, ["Caja de herramientas.png"], 25000);

            AddHardcodedArticulo(3, new ArticuloIn()
            {
                Descripcion = "Caña de pescar",
                Marca = "Genérica",
                Estado = "Usado"
            }, ["Caña de pescar.jpg"], 15000);

            AddHardcodedArticulo(3, new ArticuloIn()
            {
                Descripcion = "Martillo de goma",
                Marca = "BREMEN",
                Estado = "Nuevo"
            }, ["Martillo de goma.jpg"], 5500);

            AddHardcodedArticulo(4, new ArticuloIn()
            {
                Descripcion = "Tarugos",
                Marca = "Fischer",
                Estado = "Nuevo"
            }, ["Tarugos Fischer.jpg"], 5500);

            AddHardcodedArticulo(4, new ArticuloIn()
            {
                Descripcion = "Hacha de mano",
                Marca = "Genérica",
                Estado = "Usado"
            }, ["Hacha de mano.png"], 25000);

            AddHardcodedArticulo(4, new ArticuloIn()
            {
                Descripcion = "Adhesivo",
                Marca = "Eccole",
                Estado = "Nuevo"
            }, ["Eccole.webp"], 15000);

            AddHardcodedArticulo(4, new ArticuloIn()
            {
                Descripcion = "Agujereadora",
                Marca = "Black&Decker",
                Estado = "Nuevo"
            }, ["Agujereadora.jpg"], 50000);

            AddHardcodedArticulo(4, new ArticuloIn()
            {
                Descripcion = "Set de destornilladores",
                Marca = "CROSSMASTER",
                Estado = "Nuevo"
            }, ["Set de destornilladores.jpg"], 50000);

            AddHardcodedArticulo(5, new ArticuloIn()
            {
                Descripcion = "Alicate Universal",
                Marca = "DUROLL",
                Estado = "Nuevo"
            }, ["Alicate Universal.jpg"], 15000);

            AddHardcodedArticulo(5, new ArticuloIn()
            {
                Descripcion = "Rollo de cable unipolar 2.5mm",
                Marca = "TREFILCON",
                Estado = "Nuevo"
            }, ["Rollo Cable Unipolar 2.5mm.jpg"], 17500, new DateTime(2023, 6, 16));

            AddHardcodedArticulo(5, new ArticuloIn()
            {
                Descripcion = "Maza",
                Marca = "Ninguna",
                Estado = "Nuevo"
            }, ["Maza.jpg"], 50000);

            AddHardcodedArticulo(5, new ArticuloIn()
            {
                Descripcion = "Guantes de trabajo",
                Marca = "Genéricos",
                Estado = "Nuevo"
            }, ["Guantes de trabajo.webp"], 15000);

            AddHardcodedArticulo(5, new ArticuloIn()
            {
                Descripcion = "Caja Capsulada Exterior",
                Marca = "Genérica",
                Estado = "Nuevo"
            }, ["Caja Capsulada Exterior.jpg"], 15000, new DateTime(2024, 6, 16));

            WriteAll();
        }

        public static List<ArticuloOut> GetArticulos()
        {
            return Articulos.OrderByDescending(x => x.Destacado.HasValue && DateTime.Compare(x.Destacado.Value, DateTime.Now) > 0).ToList();
        }

        private static void AddHardcodedArticulo(int userID, ArticuloIn articulo, string[] images, double price, DateTime? destacado = null)
        {
            ArticuloOut nuevoArticulo = new ArticuloOut(articulo)
            {
                Id = ActualID++,
                Usuario = new UsuarioOut(UsuariosService.GetUsuarioByID(userID)),
                ImageNames = images.ToList(),
                Categoria = AsignarCategoria(price),
                Tasado = true,
                Destacado = destacado
            };

            Articulos.Add(nuevoArticulo);
            WriteAll();
        }

        public static async Task AddArticulo(int userID, ArticuloIn articulo)
        {
            ArticuloOut nuevoArticulo = new ArticuloOut(articulo)
            {
                Id = ActualID++,
                Usuario = new UsuarioOut(UsuariosService.GetUsuarioByID(userID)),
                ImageNames = new List<string>()
            };

            var ruta = String.Empty;

            if (!Directory.Exists("Images"))
                Directory.CreateDirectory("Images");

            for(int i = 0; i < articulo.Images.Length; i++)
            {
                var nombreArchivo = Guid.NewGuid().ToString() + ".jpg";
                ruta = $"Images/{nombreArchivo}";

                using(FileStream str = new FileStream(ruta, FileMode.Create))
                    await articulo.Images[i].CopyToAsync(str);

                nuevoArticulo.ImageNames.Add(nombreArchivo);
            }

            Articulos.Add(nuevoArticulo);
            WriteAll();
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
                toUpdate.Marca = articulo.Marca;
                toUpdate.Tasado = false;
                toUpdate.ImageNames = new List<string>();

                var ruta = String.Empty;

                if (!Directory.Exists("Images"))
                    Directory.CreateDirectory("Images");

                for (int i = 0; i < articulo.Images.Length; i++)
                {
                    var nombreArchivo = Guid.NewGuid().ToString() + ".jpg";
                    ruta = $"Images/{nombreArchivo}";

                    using (FileStream str = new FileStream(ruta, FileMode.Create))
                        articulo.Images[i].CopyTo(str);

                    toUpdate.ImageNames.Add(nombreArchivo);
                }

                WriteAll();
            }
        }

        public static void DeleteArticulo(int id)
        {
            int index = Articulos.FindIndex(x => x.Id == id);

            if(index != -1)
                Articulos.RemoveAt(index);

            WriteAll();
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

        public static bool TasarArticulo(int articuloID, int precioEstimado)
        {
            ArticuloOut aTasar = GetArticulo(articuloID);

            if (aTasar == null)
                return false;
            else
            {
                aTasar.Categoria = AsignarCategoria(precioEstimado);
                aTasar.Tasado = true;

                if(aTasar.Tasado && aTasar.ArticuloAsociado.HasValue)
                {
                    if(GetArticulo(articuloID) != null && GetArticulo(aTasar.ArticuloAsociado.Value) != null)
                        TruequesService.AddTrueque(new TruequeIn()
                        {
                            ArticuloOfrecidoID = articuloID,
                            ArticuloSolicitadoID = aTasar.ArticuloAsociado.Value
                        });
                }

                WriteAll();
                return true;
            }
        }

        private static string AsignarCategoria(double precio) => precio switch
        {
            < 1000 => "I",
            >= 1000 and < 2500 => "II",
            >= 2500 and < 5000 => "III",
            >= 5000 and < 7500 => "IV",
            >= 7500 and < 10000 => "V",
            >= 10000 and < 20000 => "VI",
            >= 20000 and < 40000 => "VII",
            >= 40000 and < 70000 => "VIII",
            >= 70000 and < 100000 => "IX",
            >= 100000 => "X",
            _ => throw new NotImplementedException()
        };

        public static IEnumerable<ArticuloOut> GetArticulosPublicados()
        {
            return GetArticulosTasados().Where(x => !x.Truequeado);
        }

        public static void AddComentario(int id, string comentario)
        {
            ArticuloOut toComment = Articulos.FirstOrDefault(x => x.Id == id);
            toComment.Comentarios.Add(new Comentario(comentario));
            
            WriteAll();
        }

        public static void AddRespuesta(int id, int comentarioId, string respuesta)
        {
            ArticuloOut articulo = Articulos.FirstOrDefault(x => x.Id == id);
            Comentario c = articulo.Comentarios.ElementAt(comentarioId);
            c.Respuesta = respuesta;

            WriteAll();
        }

        public static void DestacarArticulo(int id, int duracion)
        {
            ArticuloOut articulo = Articulos.FirstOrDefault(x => x.Id == id);
            articulo.Destacado = DateTime.Now.AddDays(duracion);
            WriteAll();
        }
    }
}
