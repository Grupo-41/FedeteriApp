using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class SucursalesService
    {
        static List<Sucursal> Sucursals = new List<Sucursal>()
        {
            new Sucursal() { Id = 0, Direccion = "Coronel Olmedo 296 Piso 2 Depto. 6", Nombre = "Fedeteria Coronel"},
            new Sucursal() { Id = 1, Direccion = "Iturraspe 1029", Nombre = "Fedeteria Iturraspe"},
            new Sucursal() { Id = 2, Direccion = "Manuel Castro 2559", Nombre = "Fedeteria Castro"},
            new Sucursal() { Id = 3, Direccion = "Chacabuco 1521 Pb", Nombre = "Fedeteria Chacabuco"},
            new Sucursal() { Id = 4, Direccion = "La Plata 41 664", Nombre = "Fedeteria La Plata"},
            new Sucursal() { Id = 5, Direccion = "Colon 1197", Nombre = "Fedeteria Colon"},
        };

        public static List<Sucursal> GetSucursals()
        {
            return Sucursals;
        }

        public static Sucursal GetSucursal(int id)
        {
            return Sucursals[id];
        }
    }
}
