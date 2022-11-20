using AuthServiceApp.BL.Helpers;
using AuthServiceApp.BL.Services.GenericService;
using AuthServiceApp.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers
{

    public class GenericController<T> : ControllerBase where T : class
    {
        protected string GetUserId()
        {
            return ClaimHelper.GetUserId(this.User);
        }

    }
}
