using Microsoft.AspNetCore.Mvc;
using MercadoPago.Config;
using MercadoPago.Client.Preference;
using MercadoPago.Resource.Preference;

namespace FedeteriAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        [HttpGet("create-order/{duracion}")]
        public async Task<string> CreateOrderAsync(int duracion)
        {
            MercadoPagoConfig.AccessToken = "APP_USR-2881635607325252-061519-18a609310c6598d7c8b049a0c3c58326-1858509093";

            var request = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
                {
                    PreferenceItems.Create(duracion)
                },
                BackUrls = new PreferenceBackUrlsRequest()
                {
                    Success = "http://localhost:3000/payment/success",
                    Pending = "http://localhost:3000/",
                    Failure = "http://localhost:3000/payment/failure",
                },
                BinaryMode = true,
            };

            // Crea la preferencia usando el client
            var client = new PreferenceClient();
            Preference preference = await client.CreateAsync(request);

            return preference.InitPoint;
        }
    }

    public static class PreferenceItems
    {
        public static PreferenceItemRequest Create(int duracion)
        {
            switch(duracion)
            {
                case 1:
                    return new PreferenceItemRequest
                    {
                        Title = "Destacar - 1 día",
                        CurrencyId = "ARS",
                        UnitPrice = 1000,
                        Quantity = 1
                    };
                case 7:
                    return new PreferenceItemRequest
                    {
                        Title = "Destacar - 7 días",
                        CurrencyId = "ARS",
                        UnitPrice = 5000,
                        Quantity = 1
                    };
                case 14:
                    return new PreferenceItemRequest
                    {
                        Title = "Destacar - 14 días",
                        CurrencyId = "ARS",
                        UnitPrice = 10000,
                        Quantity = 1
                    };
                case 30:
                    return new PreferenceItemRequest
                    {
                        Title = "Destacar - 30 días",
                        CurrencyId = "ARS",
                        UnitPrice = 15000,
                        Quantity = 1
                    };
                default:
                    return new PreferenceItemRequest
                    {
                        Title = "Destacar - 1 día",
                        CurrencyId = "ARS",
                        UnitPrice = 1000,
                        Quantity = 1
                    };
            }
        }
    }
}
