using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaskTackingAPI.Controllers;

[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [Authorize]
    [HttpGet("auth")]
    public async Task<string> TestAuth()
    {
        return "Ok";
    }
    
    [AllowAnonymous]
    [HttpGet("no-auth")]
    public async Task<string> TestNoAuth()
    {
        return "Ok";
    }
}