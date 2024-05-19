using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TaskTackingAPI.Models;
using TaskTackingAPI.Settings;

namespace TaskTackingAPI.Services;

public sealed class JwtService
{
    private readonly SymmetricSecurityKey _key;
    private readonly IOptions<ServerSettings> _settings;
    private readonly JwtSecurityTokenHandler _tokenHandler = new();


    public JwtService(IOptions<ServerSettings> settings)
    {
        _settings = settings;
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Value.AuthSecret));
    }

    public async Task<string> CreateToken(UserModel userModel)
    {
        var claims = new List<Claim>()
        {
            new(JwtRegisteredClaimNames.NameId, userModel.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, userModel.Email),
            new(ClaimTypes.Role, "user")
        };

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials =  new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature)
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }
}