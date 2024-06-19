namespace FedeteriAPI.Services
{
    public static class ProductosService
    {
        static List<Producto> Productos = new List<Producto>()
        {
            new Producto()
            {
                Codigo = "CPG-001",
                Nombre = "Caña de pescar",
                Marca = "Genérico",
                ImageName = "Caña de pescar.jpg"
            },
            new Producto()
            {
                Codigo = "DLD-000",
                Nombre = "Desmalezadora",
                Marca = "Genérico",
                ImageName = "Desmalezadora.jpg"
            },
            new Producto()
            {
                Codigo = "AGR-002",
                Nombre = "Agujereadora",
                Marca = "Black&Decker",
                ImageName = "Agujereadora.jpg"
            },
            new Producto()
            {
                Codigo = "NVL-000",
                Nombre = "Nivel",
                Marca = "Genérico",
                ImageName = "Nivel.jpg"
            },
            new Producto()
            {
                Codigo = "PLA-000",
                Nombre = "Pala",
                Marca = "Genérico",
                ImageName = "Pala.jpg"
            },
            new Producto()
            {
                Codigo = "LFA-000",
                Nombre = "Llave Francesa",
                Marca = "BAHCO",
                ImageName = "Llave Francesa.jpg"
            },
            new Producto()
            {
                Codigo = "MTS-010",
                Nombre = "Motosierra",
                Marca = "STIHL",
                ImageName = "Motosierra.jpg"
            },
            new Producto()
            {
                Codigo = "MTO-100",
                Nombre = "Martillo",
                Marca = "Genérico",
                ImageName = "Martillo.jpg"
            },
            new Producto()
            {
                Codigo = "SDD-210",
                Nombre = "Set de destornilladores",
                Marca = "CROSSMASTER",
                ImageName = "Set de destornilladores.jpg"
            },
            new Producto()
            {
                Codigo = "TNL-021",
                Nombre = "Tornillos",
                Marca = "Genéricos",
                ImageName = "Tornillos.jpg"
            },
            new Producto()
            {
                Codigo = "LSN-110",
                Nombre = "Llave Stillson",
                Marca = "Genérico",
                ImageName = "Llave Stillson.jpg"
            }
        };

        public static IEnumerable<Producto> GetProductos()
        {
            return Productos;
        }

        public static Producto GetProductoByCodigo(string codigo)
        {
            return Productos.FirstOrDefault(x => x.Codigo == codigo);
        }
    }

    public class Producto
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Marca { get; set; }
        public string ImageName { get; set; }
    }
}
