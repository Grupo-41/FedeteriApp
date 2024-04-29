﻿using CinemaNightAPI.Utils;
using FedeteriAPI.Models;
using FedeteriAPI.Utils;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Services
{
    public class UsuariosService
    {
        static List<UsuarioIn> Usuarios = new List<UsuarioIn>();
        static int ActualID = 0;

        public static void WriteAll() => FilesService<UsuarioIn>.WriteAll(Paths.FILE_USUARIOS, Usuarios);
        public static async Task ReadAllAsync() {
            Usuarios = await FilesService<UsuarioIn>.ReadAllAsync(Paths.FILE_USUARIOS);

            if(Usuarios.Count > 0)
                ActualID = Usuarios.Max(x => x.Id) + 1;
        }

        public static void Add(UsuarioIn usuario)
        {
            usuario.Id = ActualID++;
            Usuarios.Add(usuario);
            WriteAll();
        }

        public static List<UsuarioIn> GetUsuarios()
        {
            return Usuarios;
        }

        public static UsuarioIn GetUsuarioByID(int id)
        {
            return Usuarios.FirstOrDefault(x => x.Id == id);
        }

        public static List<ArticuloOut> GetArticulos(int userId)
        {
            return ArticulosService.GetArticulosByUsuario(userId);
        }

        public static async Task EnviarCodigoRecuperacionAsync(int userId)
        {
            string codigo = CodigosService.GenerarCodigo(userId);
            await CodigosService.EnviarCodigo(userId, codigo);
        }
    }
}
