namespace FedeteriAPI.Models
{
    public class UsuarioOut
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int DNI { get; set; }
        public string Email { get; set; }

        public UsuarioOut(UsuarioIn usuario)
        {
            this.Id = usuario.Id;
            this.Nombre = usuario.Nombre;
            this.DNI = usuario.DNI;
            this.Email = usuario.Email;
        }
    }
}
