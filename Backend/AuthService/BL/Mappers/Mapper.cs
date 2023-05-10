using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Entities.Account;
using AuthServiceApp.DAL.Entities.Operations;
using AuthServiceApp.WEB.DTOs.Account;
using AuthServiceApp.WEB.DTOs.AimRecording;
using AuthServiceApp.WEB.DTOs.Operations;
using AutoMapper;

namespace AuthServiceApp.BL.Mappers
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            AccountMappings();
            OperationMappings();
            AimRecordingMappings();
        }

        private void AccountMappings()
        {
            CreateMap<AccountEntity, AccountModel>().ReverseMap();
            CreateMap<CreateAccountModel, AccountEntity>();
            CreateMap<UpdateAccountModel, AccountEntity>();
        } 
        private void OperationMappings()
        {
            CreateMap<OperationModel, OperationEntity>().ReverseMap();
            CreateMap<CreateOperationModel, OperationEntity>();
        }

        private void AimRecordingMappings()
        {
            CreateMap<AimRecordingEntity, AimRecordingModel>().ReverseMap();
        }
    }
}
