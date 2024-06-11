namespace FedeteriAPI.Models
{
    public class Comentario
    {
        public string Texto { get; set; }
        public string Respuesta { get; set; }

        public Comentario()
        {

        }

        public Comentario(string texto)
        {
            this.Texto = texto;
        }
    }
}
