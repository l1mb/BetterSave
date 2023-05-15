using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Entities.Categories;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Input.Shop;
using AuthServiceApp.WEB.DTOs.Input.Spending;
using AuthServiceApp.WEB.DTOs.Spending;
using AutoMapper;
using MailKit.Search;
using System.Linq.Expressions;

namespace AuthServiceApp.BL.Services.Classes
{
    public class SpendingService : ISpendingService
    {
        private readonly IMapper _mapper;
        private readonly ISpendingRepository _spendingRepository;
        private readonly IGenericService<SpendingCategory?> _spendingCategoryService;
        private readonly IGenericService<CardEntity?> _cardRepository;

        public SpendingService(IMapper mapper, ISpendingRepository spendingRepository, IGenericService<SpendingCategory?> spendingCategoryService, IGenericService<CardEntity?> cardRepository)
        {
            _mapper = mapper;
            _spendingCategoryService = spendingCategoryService;
            _spendingRepository = spendingRepository;
            _cardRepository = cardRepository;
        }
        public async Task<SpendingReportDto> CreateSpending(SpendingDto spendingDto)
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

                var categ = await _spendingCategoryService.GetOneAsync(one => one.Keywords.IndexOf(item.Name) >= 0);
                if (categ is null)
                {
                    categ = await _spendingCategoryService.GetOneAsync(one => one.Name == "Uncategorized");

                    if (categ is null)
                    {
                        categ = new SpendingCategory() { Name = "Uncategorized", Keywords = "" };
                        item.SpendingCategory = categ;
                        continue;
                    }
                }
                item.SpendingCategoryId = categ.Id;


            }

            //foreach (var item in positionsList)
            //{
            //    item.SpendingCategory = _shopCategoryRepo.FindCategory(qwe => qwe.Name.Includes(item.Name));
            //}

            spending.ShopPositions = positionsList;

            var createResult = await _spendingRepository.CreateItemAsync(spending);

            ExceptionUtilities.CheckSaveStatus(createResult);
            SpendingReportDto dto = new()
            {
                Id = createResult.Id,
                Coast = createResult.Cost,
                Name = createResult.Name,
                Date = createResult.SpendingDate,
                Shop = _mapper.Map<ShopDto>(createResult.Shop),
                ShopItems = createResult.ShopPositions.Select(shopItem => new SpendingShopItemCategory()
                {
                    Name = shopItem.Name,
                    Price = shopItem.Price,
                    CategoryName = shopItem.SpendingCategoryId.ToString()
                }).ToList()
            };

            var card = await _cardRepository.GetOneAsync(it => it.Id == createResult.CardId);
            card.Balance -= createResult.Cost;
            if (card.Balance < 0)
            {
                throw new ApplicationHelperException(ServiceResultType.InvalidData, "Balance couldn't be negative");
            }
            await _cardRepository.UpdateAsync(card);

            return dto;
        }

        private Spending AggregateSpending(SpendingDto spendingDto)
        {
            var spending = _mapper.Map<Spending>(spendingDto);
            var positionsList = _mapper.Map<List<ShopPosition>>(spendingDto.ShopPositions);
            return spending;

        }

        public async Task<List<SpendingReportDto>> GetSpendingsAsync(DateTime beginDate, int limit, int offset, string orderBy, Guid? cardId)
        {
            Expression<Func<Spending, bool>> expression = (cardId != null) ? el => el.CardId == cardId && el.SpendingDate > beginDate : el => el.SpendingDate > beginDate;
            var result = await _spendingRepository
                .SearchForMultipleItemsAsync(expression, offset: offset, limit: limit, GetExpression(orderBy));

            List<SpendingReportDto> dto = result.Select(spending => new SpendingReportDto()
            {
                Id = spending.Id,
                Coast = spending.Cost,
                Name = spending.Name,
                Date = spending.SpendingDate,
                Shop = _mapper.Map<ShopDto>(spending.Shop),
                ShopItems = spending.ShopPositions.Select(shopItem => new SpendingShopItemCategory()
                {
                    Name = shopItem.Name,
                    Price = shopItem.Price,
                    CategoryName = shopItem.SpendingCategory.Name
                }).ToList()
            }).ToList();

            return dto;
        }

        public async Task<Spending?> GetSpendingAsync(Guid id)
        {
            var result = await _spendingRepository.SearchForSingleItemAsync(item => item.Id == id);


            return result;
        }

        public async Task<Spending> DeleteSpendingAsync(Guid id)
        {
            var result = await _spendingRepository.RemoveItemAsync(ext => ext.Id == id);

            return result;
        }

        private Expression<Func<Spending, object>> GetExpression(string prop = "name")
        {
            return prop.ToLower() switch
            {
                "cost" => x => x.Cost,
                "date" => x => x.SpendingDate,
                _ => x => x.Name,
            };
        }

        public async Task<IEnumerable<res>> GetInfoOnCategories(Guid cardId, string userId)
        {

            var spendings = await _spendingRepository.SearchForMultipleItemsAsync(item => item.CardId == cardId && item.UserId.ToString() == userId, ord => ord.Id);
            var allCategories = _spendingCategoryService.GetAsync(i => i.IsDeleted == false, ord => ord.Id);
            var t = spendings.ToList();


            var result = await _spendingRepository.GetCategoriesSpendings(cardId);
            //var result = await _spendingRepository.SearchForMultipleItemsAsync(items => items.CardId == cardId && items.UserId.ToString() == userId, ord => ord.Id);
            return new List<res>();
        }


    }

    public interface ISpendingService
    {
        Task<SpendingReportDto> CreateSpending(SpendingDto spendingDto);
        Task<Spending?> GetSpendingAsync(Guid id);
        Task<List<SpendingReportDto>> GetSpendingsAsync(DateTime beginEnd, int limit, int offset, string orderBy, Guid? cardId);
        //todo add update method
        Task<Spending> DeleteSpendingAsync(Guid id);
        Task<IEnumerable<res>> GetInfoOnCategories(Guid cardId, string userId);
    }
}
