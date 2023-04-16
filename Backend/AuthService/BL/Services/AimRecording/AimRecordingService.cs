using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.AimRecording;
using AutoMapper;

namespace AuthServiceApp.BL.Services.AimRecording
{
    public class AimRecordingService:IAimRecordingService
    {
        private IBaseRepository<AimRecordingEntity> _baseRepository;
        private readonly IMapper _mapper;

        public AimRecordingService(IBaseRepository<AimRecordingEntity> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public async Task<AimRecordingModel> CreateAimRecording(AimRecordingModel model)
        {
            var entity = _mapper.Map<AimRecordingEntity>(model);
            var result  = await _baseRepository.CreateItemAsync(entity);

            return _mapper.Map<AimRecordingModel>(result);
        }
    }

    public interface IAimRecordingService
    {
        Task<AimRecordingModel> CreateAimRecording(AimRecordingModel model);
    }
}
