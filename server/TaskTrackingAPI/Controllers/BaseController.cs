using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    protected readonly UserManager<User> _userManager;


    public User CurrentUser => GetCurrentUser().Result;
    
    public BaseController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    
    private async Task<User> GetCurrentUser() => await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty);
}