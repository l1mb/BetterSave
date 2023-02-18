using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.BL.Services.Pictures.Interfaces
{
    public interface IPictureService
    {
        Task<string> GetTextFromPicture([FromForm] IFormFile avatar);
    }
}