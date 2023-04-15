using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.WEB.DTOs.Account;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            AccountMappings();
        }

        private void AccountMappings()
        {
            CreateMap<AccountEntity, AccountModel>().ReverseMap();
            CreateMap<CreateAccountModel, AccountEntity>();
            CreateMap<UpdateAccountModel, AccountEntity>();
        }
    }
}
