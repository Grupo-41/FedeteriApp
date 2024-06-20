namespace FedeteriAPI.Services
{
    public static class PuntosService
    {
        public static int AsignarPuntosPorVenta(double precio) => precio switch
        {
            < 1000 => 1,
            >= 1000 and < 2500 => 2,
            >= 2500 and < 5000 => 3,
            >= 5000 and < 7500 => 4,
            >= 7500 and < 10000 => 5,
            >= 10000 and < 20000 => 6,
            >= 20000 and < 40000 => 7,
            >= 40000 and < 70000 => 8,
            >= 70000 and < 100000 => 9,
            >= 100000 => 10,
            _ => throw new NotImplementedException()
        };

        public static int CalcularDescuento(int puntos)
        {
            double puntosDouble = puntos / 2;
            return (int)Math.Round(puntosDouble);
        }
    }
}
