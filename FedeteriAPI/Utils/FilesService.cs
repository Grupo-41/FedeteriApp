using FedeteriAPI.Models;
using System.Text.Json;

namespace CinemaNightAPI.Utils
{
    public static class FilesService<T>
    {
        public static async Task<List<T>> ReadAllAsync(string path)
        {
            if (File.Exists(path))
            {
                string contents = await File.ReadAllTextAsync(path);

                if (!string.IsNullOrEmpty(contents))
                    return JsonSerializer.Deserialize<IEnumerable<T>>(contents).ToList();
            }

            return new List<T>();
        }

        public static void WriteAll(string path, List<T> values)
        {
            File.WriteAllText(path, JsonSerializer.Serialize(values));
        }
    }
}
