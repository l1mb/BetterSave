using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Classes
{
    public class SpendingService : ISpendingService
    {
        private readonly IMapper _mapper;
        private readonly ISpendingRepository _spendingRepository;
        private readonly IShopService _shopService;

        public SpendingService(IMapper mapper, ISpendingRepository spendingRepository, IShopService shopService)
        {
            _mapper = mapper;
            _spendingRepository = spendingRepository;
            _shopService = shopService;
        }
        public async Task<Spending> CreateSpending(SpendingDto spendingDto)
        {
            //create shops
            //var shop = await _shopService.CreateShop(new(spendingDto.ShopName));

            var spending = _mapper.Map<Spending>(spendingDto);

            spending.Shop = new() { ShopName = spendingDto.ShopName };
            spending.SpendingDate = DateTime.UtcNow;

            var positionsList = _mapper.Map<List<ShopPosition>>(spendingDto.ShopPositions);

            //foreach (var item in positionsList)
            //{
            //    item.SpendingCategory = _shopCategoryRepo.FindCategory(qwe => qwe.Name.Includes(item.Name));
            //}

            spending.ShopPositions = positionsList;

            var createResult = await _spendingRepository.CreateItemAsync(spending);

            ExceptionUtilities.CheckSaveStatus(createResult);

            return createResult;
        }

        private Spending AggregateSpending(SpendingDto spendingDto)
        {
            var spending = _mapper.Map<Spending>(spendingDto);
            var positionsList = _mapper.Map<List<ShopPosition>>(spendingDto.ShopPositions);
            return spending;

        }
    }

    public interface ISpendingService
    {
        Task<Spending> CreateSpending(SpendingDto spendingDto);
    }
}
