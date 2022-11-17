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

        public CardService(IMapper mapper, ICardRepository cardRepository) : base(cardRepository, mapper)
        {
            this.cardRepository = cardRepository;
            this.mapper = mapper;
        }

        public async Task<CardEntity> CreateCard(CardDto cardDto)
        {
            var entity = mapper.Map<CardEntity>(cardDto);
            var res = await CreateAsync(entity);

            return res;
        }

        public async Task<List<CardDto>> GetCards(string userId)
        {
            var result = await GetAsync(getOne => getOne.User.Id.ToString() == userId, sortBy => sortBy.Balance);
            var dto = mapper.Map<List<CardDto>>(result);

            return dto;
        }
    }
}
