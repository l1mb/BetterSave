using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.AimRecording;
using AutoMapper;
using SixLabors.ImageSharp.ColorSpaces;

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

        public async Task<AimRecordingModel> CreateAimRecordingAsync(AimRecordingModel model)
        {
            var entity = _mapper.Map<AimRecordingEntity>(model);
            var result  = await _baseRepository.CreateItemAsync(entity);

            return _mapper.Map<AimRecordingModel>(result);
        }

        public async Task<List<AimRecordingModel>> GetAimRecordingAsync(Guid aimId)
        {
            var result = await _baseRepository.SearchForMultipleItemsAsync(x => x.AimId == aimId, y => y.Date);
            return _mapper.Map<List<AimRecordingModel>>(result);
        }
    }

    public interface IAimRecordingService
    {
        Task<AimRecordingModel> CreateAimRecordingAsync(AimRecordingModel model);
        Task<List<AimRecordingModel>> GetAimRecordingAsync(Guid aimId);
    }
}
