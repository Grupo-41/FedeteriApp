using FedeteriAPI.Services;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
});

var app = builder.Build();

await UsuariosService.ReadAllAsync();
await ArticulosService.ReadAllAsync();
await CalificacionesService.ReadAllAsync();
await VentasService.ReadAllAsync();
await CodigosService.ReadAllAsync();
await TruequesService.ReadAllAsync();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(x => true).WithOrigins([@"http://localhost:3000", @"http://localhost:*"]));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
