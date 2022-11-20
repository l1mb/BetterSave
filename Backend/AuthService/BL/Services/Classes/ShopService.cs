using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Input.Shop;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Classes
{
    public class ShopService : IShopService
    {
        private readonly IMapper _mapper;
        private readonly IShopRepository _shopRepository;
        public ShopService(IMapper mapper, IShopRepository shopRepository)
        {
            _mapper = mapper;
            _shopRepository = shopRepository;
        }
        public async Task<Shop> CreateShop(ShopDto shopDto)
        {
            var shop = _mapper.Map<Shop>(shopDto);
            var result = await _shopRepository.CreateItemAsync(shop);

            ExceptionUtilities.CheckSaveStatus(result);

            return result;
        }
    }
}
