using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Input.Shop;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Classes
{
    public class SpendingService : ISpendingService
    {
        private readonly IMapper _mapper;
        private readonly ISpendingRepository _spendingRepository;
        private readonly IGenericService<SpendingCategory> _spendingCategoryService;

        public SpendingService(IMapper mapper, ISpendingRepository spendingRepository, IGenericService<SpendingCategory> spendingCategoryService)
        {
            _mapper = mapper;
            _spendingCategoryService = spendingCategoryService;
            _spendingRepository = spendingRepository;
        }
        public async Task<Spending> CreateSpending(SpendingDto spendingDto)
        {
            //create shops
            //var shop = await _shopService.CreateShop(new(spendingDto.ShopName));

            var spending = _mapper.Map<Spending>(spendingDto);

            spending.Shop = new() { ShopName = spendingDto.ShopName };
            spending.SpendingDate = DateTime.UtcNow;

            var positionsList = _mapper.Map<List<ShopPosition>>(spendingDto.ShopPositions);
            foreach (var item in positionsList)
            {
                spending.Cost += item.Price;
                var res = await _spendingCategoryService
                    .GetOneAsync(one => one.Keywords.IndexOf(item.Name) > 0);
                if (res is null)
                {
                    res = new SpendingCategory() { Name = "Uncategorized", Keywords = "" };
                }

                item.SpendingCategory = res;
            }

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

        public async Task<List<Spending>> GetSpendingsAsync(GetSpendingsDto getSpendingsDto)
        {
            var result = await _spendingRepository.SearchForMultipleItemsAsync(res => res.SpendingDate > getSpendingsDto.StartDate, getSpendingsDto.Limit, getSpendingsDto.Offset, s => s.Name);

            return result;
        }

        public async Task<Spending> GetSpendingAsync(Guid id)
        {
            var result = await _spendingRepository.SearchForSingleItemAsync(item => item.Id == id);

            return result;
        }

        public async Task<Spending> DeleteSpendingAsync(Guid id)
        {
            var result = await _spendingRepository.RemoveItemAsync(ext => ext.Id == id);

            return result;
        }
    }

    public interface ISpendingService
    {
        Task<Spending> CreateSpending(SpendingDto spendingDto);
        Task<Spending> GetSpendingAsync(Guid id);
        Task<List<Spending>> GetSpendingsAsync(GetSpendingsDto spendingDto);
        Task<Spending> DeleteSpendingAsync(Guid id);
    }
}
