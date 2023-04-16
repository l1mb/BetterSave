using System.Security.Cryptography.X509Certificates;
using AuthServiceApp.BL.Services.Account;
using AuthServiceApp.WEB.DTOs.Account;
using Microsoft.AspNetCore.Mvc;

namespace AuthServiceApp.WEB.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : GenericController
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        this._accountService = accountService;
    }

    /// <summary>
    /// Get user accounts
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetAccountsList(Guid userId)
    {
        var result  = await _accountService.GetAllAccountsAsync(userId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAccount(CreateAccountModel request)
    {
        var result = await _accountService.CreateAccountAsync(request);
        return CreatedAtAction(nameof(CreateAccount), result);
    }

    [HttpDelete("{accountId:guid}")]
    public async Task<IActionResult> DeleteAccount(Guid accountId)
    {
        await _accountService.DeleteAccountAsync(accountId);
        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAccount(UpdateAccountModel request)
    {
        var result = await _accountService.UpdateAccountAsync(request);
        return Ok(result);
    }
}