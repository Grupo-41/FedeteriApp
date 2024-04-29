namespace FedeteriAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string DNI { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Contrasena { get; set; }
        public DateTime Nacimiento { get; set; }
        public List<Articulo> ArticulosPublicados { get; set; } = new List<Articulo>();
        private int ActualIndex = 0;

        public Articulo GetArticulo(int id)
        {
            return ArticulosPublicados.FirstOrDefault(x => x.Id == id);
        }

        public void AddArticulo(Articulo articulo)
        {
            articulo.Id = ActualIndex++;
            ArticulosPublicados.Add(articulo);
        }

        public void DeleteArticulo(int id)
        {
            int index = ArticulosPublicados.FindIndex(x => x.Id == id);

            if(index != -1)
                ArticulosPublicados.RemoveAt(index);
        }
    }
}
