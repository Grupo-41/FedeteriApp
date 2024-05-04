using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class SucursalesService
    {
        static List<Sucursal> Sucursales = new List<Sucursal>()
        {
            new Sucursal() { 
                Id = 0, 
                Direccion = "Coronel Dorrego 296", 
                Nombre = "Fedeteria Coronel", 
                Telefono = 2921289101,
                HorariosAtencion = "Lunes a Viernes de 8hs a 18hs. Sábados, Domingos y feriados de 8hs a 12hs"
            },
            new Sucursal() {
                Id = 1, 
                Direccion = "Iturraspe 1029", 
                Nombre = "Fedeteria Iturraspe", 
                Telefono = 3564127402,
                HorariosAtencion = "Lunes a Viernes de 8hs a 18hs. Sábados, Domingos y feriados de 8hs a 12hs"
            },
            new Sucursal() { 
                Id = 2, 
                Direccion = "Manuel Castro 2559", 
                Nombre = "Fedeteria Castro", 
                Telefono = 2942910239, 
                HorariosAtencion = "Lunes a Viernes de 12hs a 18hs. Sábados, Domingos y feriados de 8hs a 12hs"
            },
            new Sucursal() { 
                Id = 3, 
                Direccion = "Chacabuco 1521 Pb", 
                Nombre = "Fedeteria Chacabuco", 
                Telefono = 2352482901,
                HorariosAtencion = "Lunes a Viernes de 8hs a 16hs. Sábados, Domingos y feriados de 10hs a 12hs"
            },
            new Sucursal() { 
                Id = 4, 
                Direccion = "La Plata 41 664", 
                Nombre = "Fedeteria La Plata", 
                Telefono = 2218921577,
                HorariosAtencion = "Lunes a Viernes de 12hs a 18hs. Sábados, Domingos y feriados de 10hs a 12hs"
            },
            new Sucursal() { 
                Id = 5, 
                Direccion = "Colon 1197", 
                Nombre = "Fedeteria Colon", 
                Telefono = 3447910385, 
                HorariosAtencion = "Lunes a Viernes de 8hs a 18hs. Sábados, Domingos y feriados de 8hs a 12hs"
            },
        };

        public static List<Sucursal> GetSucursals()
        {
            return Sucursales;
        }

        public static Sucursal GetSucursal(int id)
        {
            return Sucursales.FirstOrDefault(x => x.Id == id);
        }
    }
}
