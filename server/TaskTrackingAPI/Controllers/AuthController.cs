using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs.AuthDtos;
using TaskTackingAPI.Models;
using TaskTackingAPI.Services;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;


[Route("api/[controller]")]
public class AuthController : BaseController
{
    private readonly JwtService _jwtService;
    private readonly ApplicationDbContext _context;
    private readonly SignInManager<User> _signInManager;

    public AuthController(JwtService jwtService, ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager) : base(userManager)
    {
        _jwtService = jwtService;
        _context = context;
        _signInManager = signInManager;
    }
    
    [HttpPost("signin")]
    public async Task<ActionResult<AuthDto>> SignIn([FromBody] SignInDto signInDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == signInDto.Email);
        
        if (user == null)
           return Unauthorized("Email doesn't exist");

        var result = await _signInManager.CheckPasswordSignInAsync(user, signInDto.Password, false);
        
        if (result.Succeeded)
        {
            var userModel = new UserModel() {Email = user.Email, Id = user.Id};
            var response = await _jwtService.CreateToken(userModel.Email);
            var userRefresh = new UserRefreshToken()
            {
                RefreshToken = response.RefreshToken,
                Email = user.Email
            };
            _context.UserRefreshTokens.Add(userRefresh);
            await _context.SaveChangesAsync();
            
            return response;
        }

        return Unauthorized();
    }

    [HttpPost("signup")]
    public async Task<ActionResult<AuthDto>> SignUp([FromBody] SignUpDto signInDto)
    {
        var user = new User()
        {
            Email = signInDto.Email,
            UserName = signInDto.Email,
            PhoneNumber = signInDto.PhoneNumber,
            Name = signInDto.Name,
        };
        
        var result = await _userManager.CreateAsync(user, signInDto.Password);
        
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        
        var response = await _jwtService.CreateToken(user.Email);

        var userRefresh = new UserRefreshToken()
        {
            RefreshToken = response.RefreshToken,
            Email = user.Email
        };
        
        _context.UserRefreshTokens.Add(userRefresh);
        await _context.SaveChangesAsync();
        
        return response;
    }
    
    [AllowAnonymous]
    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody]AuthDto token)
    {
        var principal = _jwtService.GetPrincipalFromExpiredToken(token.Token);
        var username = principal.Identity?.Name;

        //retrieve the saved refresh token from database
        var savedRefreshToken = _context.UserRefreshTokens.FirstOrDefault(x =>
            x.Email == username && x.RefreshToken == token.RefreshToken && x.IsActive == true);
        
        if (savedRefreshToken.RefreshToken != token.RefreshToken)
        {
            return Unauthorized("Invalid attempt!");
        }

        var newJwtToken = await _jwtService.CreateToken(username);

        if (newJwtToken == null)
        {
            return Unauthorized("Invalid attempt!");
        }

        var obj = new UserRefreshToken
        {
            RefreshToken = newJwtToken.RefreshToken,
            Email = username
        };

        var item = _context.UserRefreshTokens.FirstOrDefault(x => x.Email == username && x.RefreshToken == token.RefreshToken);
        if (item != null)
        {
            _context.UserRefreshTokens.Remove(item);
        }
        
        _context.UserRefreshTokens.Add(obj);
        await _context.SaveChangesAsync();

        return Ok(newJwtToken);
    }
}