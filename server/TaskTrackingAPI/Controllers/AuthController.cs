using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs.AuthDtos;
using TaskTackingAPI.Models;
using TaskTackingAPI.Services;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;


[Route("api/[controller]")]
public class AuthController(JwtService jwtService, ApplicationDbContext context) : ControllerBase
{
    [HttpPost("signin")]
    public async Task<ActionResult<AuthDto>> SignIn([FromBody] SignInDto signInDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email == signInDto.Email);

        if (user is not null && user.Password == signInDto.Password)
        {
            var userModel = new UserModel() {Email = user.Email, Id = user.Id};
            var response = await jwtService.CreateToken(userModel.Email);
            var userRefresh = new UserRefreshToken()
            {
                RefreshToken = response.RefreshToken,
                Email = user.Email
            };
            context.UserRefreshTokens.Add(userRefresh);
            await context.SaveChangesAsync();
            
            return response;
        }

        return Unauthorized();
    }

    [HttpPost("signup")]
    public async Task<AuthDto> SignUp([FromBody] SignUpDto signInDto)
    {
        var user = new UserModel(signInDto);
        var userModel = context.Users.Add(user.ToEntity());
        
        var response = await jwtService.CreateToken(user.Email);

        var userRefresh = new UserRefreshToken()
        {
            RefreshToken = response.RefreshToken,
            Email = userModel.Entity.Email
        };
        
        context.UserRefreshTokens.Add(userRefresh);
        await context.SaveChangesAsync();
        
        return response;
    }
    
    [AllowAnonymous]
    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody]AuthDto token)
    {
        var principal = jwtService.GetPrincipalFromExpiredToken(token.Token);
        var username = principal.Identity?.Name;

        //retrieve the saved refresh token from database
        var savedRefreshToken = context.UserRefreshTokens.FirstOrDefault(x =>
            x.Email == username && x.RefreshToken == token.RefreshToken && x.IsActive == true);
        
        if (savedRefreshToken.RefreshToken != token.RefreshToken)
        {
            return Unauthorized("Invalid attempt!");
        }

        var newJwtToken = await jwtService.CreateToken(username);

        if (newJwtToken == null)
        {
            return Unauthorized("Invalid attempt!");
        }

        // saving refresh token to the db
        var obj = new UserRefreshToken
        {
            RefreshToken = newJwtToken.RefreshToken,
            Email = username
        };

        var item = context.UserRefreshTokens.FirstOrDefault(x => x.Email == username && x.RefreshToken == token.RefreshToken);
        if (item != null)
        {
            context.UserRefreshTokens.Remove(item);
        }
        
        context.UserRefreshTokens.Add(obj);
        await context.SaveChangesAsync();

        return Ok(newJwtToken);
    }

    [HttpGet("test-tokens/{email}")]
    public async Task<List<UserRefreshToken>> GetTokens(string email)
    {
        return context.UserRefreshTokens.Where(x => x.Email == email).Select(x => x).ToList();
    }
}