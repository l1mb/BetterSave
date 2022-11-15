using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.Input.Shop;

namespace AuthServiceApp.BL.Services.Classes
{
    public interface IShopService
    {
        Task<Shop> CreateShop(ShopDto shopDto);
    }
}