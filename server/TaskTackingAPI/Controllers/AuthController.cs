using Microsoft.AspNetCore.Mvc;

namespace TaskTackingAPI.Controllers;


[Route("/auth")]
public class AuthController : ControllerBase
{
    
    [HttpGet("/refresh")]
    public async Task RefreshToken()
    {
        
    }

    [HttpGet]
    public async Task GetToken()
    {
        
    }
}