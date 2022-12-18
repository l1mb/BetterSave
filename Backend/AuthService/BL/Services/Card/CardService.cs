using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Repo;
using AuthServiceApp.DAL.Repo.Card;
using AuthServiceApp.WEB.DTOs.Card;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Card
{
    public class CardService : GenericService<CardEntity>, ICardService
    {
        private readonly IMapper mapper;
        private readonly ICardRepository cardRepository;

        public CardService(IMapper mapper, ICardRepository cardRepository) : base(cardRepository)
        {
            this.cardRepository = cardRepository;
            this.mapper = mapper;
        }

        public async Task<CardDto> CreateCard(CardDto cardDto)
        {
            var entity = mapper.Map<CardEntity>(cardDto);
            var res = await CreateAsync(entity);

            return mapper.Map<CardDto>(res);
        }

        public async Task<List<CardDto>> GetCardsByUserId(string userId)
        {
            var result = await GetAsync(getOne => getOne.User.Id.ToString() == userId, sortBy => sortBy.Balance);
            var dto = mapper.Map<List<CardDto>>(result);

            return dto;
        }

        public async Task<CardDto> GetCardById(Guid cardId)
        {
            var result = await GetOneAsync(getOne => getOne.Id == cardId);
            var dto = mapper.Map<CardDto>(result);

            return dto;
        }



        public async Task<CardDto> UpdateCard(CardUpdateDto cardUpdateDto)
        {
            var card = await GetOneAsync(one => one.Id == cardUpdateDto.Id);
            if (card is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.NotFound);
            }
            card.Balance = cardUpdateDto.Balance;
            var result = await UpdateAsync(card);
            return mapper.Map<CardDto>(result);
        }


        public async Task SoftDeleteAsync(Guid id)
        {
            await cardRepository.SoftDeleteAsync(item => item.Id == id);
        }
    }
}
