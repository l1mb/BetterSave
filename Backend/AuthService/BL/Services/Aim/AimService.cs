using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Aim;
using AutoMapper;

namespace AuthServiceApp.BL.Services.Aim
{
    public class AimService : GenericService<AimEntity>, IAimService
    {
        private IBaseRepository<AimEntity> _repository;
        private IMapper _mapper;
        public AimService(IBaseRepository<AimEntity> repository, IMapper mapper) : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        Task<AimDto> CreateAim(AimDto dto)
        {

        }
    }
}
