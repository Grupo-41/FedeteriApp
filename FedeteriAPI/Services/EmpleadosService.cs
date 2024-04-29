using CinemaNightAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public static class EmpleadosService
    {
        static List<Empleado> Empleados = new List<Empleado>();
        static int ActualID = 0;

        public static void WriteAll() => FilesService<Empleado>.WriteAll(Paths.FILE_EMPLEADOS, Empleados);
        public static async Task ReadAllAsync()
        {
            Empleados = await FilesService<Empleado>.ReadAllAsync(Paths.FILE_EMPLEADOS);

            if (Empleados.Count > 0)
                ActualID = Empleados.Max(x => x.Id) + 1;
        }

        public static List<Empleado> GetEmpleados()
        {
            return Empleados;
        }

        public static Empleado GetEmpleadoByID(int id)
        {
            return Empleados.FirstOrDefault(x => x.Id == id);
        }

        public static void AddEmpleado(Empleado e)
        {
            e.Id = ActualID++;
            Empleados.Add(e);
        }
    }
}
