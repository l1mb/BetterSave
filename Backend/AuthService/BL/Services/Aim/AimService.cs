﻿using AuthServiceApp.BL.Constants;
using AuthServiceApp.BL.Enums;
using AuthServiceApp.BL.Exceptions;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Interfaces;
using AuthServiceApp.WEB.DTOs.Aim;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.BL.Services.Aim
{
    public class AimService : GenericService<AimEntity>, IAimService
    {
        private IBaseRepository<AimEntity?> _repository;
        private IMapper _mapper;
        public AimService(IBaseRepository<AimEntity?> repository, IMapper mapper) : base(repository)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<AimDto> CreateAim(AimDto dto)
        {
            var entity = _mapper.Map<AimEntity>(dto);
            var saveResult = await _repository.CreateItemAsync(entity);

            ExceptionUtilities.CheckSaveStatus(saveResult);
            var outResult = _mapper.Map<AimDto>(saveResult);
            return outResult;
        }

        public async Task<GetAimDto> GetAimByUserId(Guid id)
        {
            var res = await GetOneAsync(item => item.UserId == id);
            return _mapper.Map<GetAimDto>(res);
        }
        public async Task<AimDto> GetAimById(Guid id)
        {
            var res = await GetOneAsync(item => item.Id == id);
            return _mapper.Map<AimDto>(res);
        }

        public async Task<AimDto> Delete(Guid id)
        {
            var res = await DeleteAsync(id);
            if (res is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.NotFound);
            }
            return _mapper.Map<AimDto>(res);
        }

        [HttpPut("/api/aim")]
        public async Task<AimDto> UpdateAsync(UpdateAimDto dto)
        {
            var item = await _repository.SearchForSingleItemAsync(item => item.Id == dto.Id);

            item.Name = dto.Name;


            var res = await _repository.UpdateItemAsync(item);
            if (res is null)
            {
                throw new ApplicationHelperException(ServiceResultType.NotFound, ExceptionMessageConstants.NotFound);
            }

            return _mapper.Map<AimDto>(item);
        }
    }
}
