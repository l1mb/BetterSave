using AuthServiceApp.BL.Services.Pictures.Interfaces;

namespace AuthServiceApp.BL.Services.Pictures
{
    public class PicturesService : IPictureService
    {
        public Task<string> GetTextFromPicture(IFormFile image)
        {
            var tesseract = new IronOcr.IronTesseract();
            tesseract.Language = IronOcr.OcrLanguage.RussianBest;
            
            var res = tesseract.Read(new IronOcr.OcrInput(ConvertToBytes(image))).Text;
            return Task.FromResult(res);
        }


        private byte[] ConvertToBytes(IFormFile image)
        {
            using (var memoryStream = new MemoryStream())
            {
                image.OpenReadStream().CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
