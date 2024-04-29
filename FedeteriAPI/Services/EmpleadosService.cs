using FedeteriAPI.Models;

namespace FedeteriAPI.Services
{
    public static class EmpleadosService
    {
        static List<Empleado> Empleados = new List<Empleado>();

        public static List<Empleado> GetEmpleados()
        {
            return Empleados;
        }

        public static Empleado GetEmpleadoByID(int id)
        {
            return Empleados.FirstOrDefault(x => x.Id == id);
        }
    }
}
