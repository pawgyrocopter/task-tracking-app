using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TaskTackingAPI.DTOs.AuthDtos;
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

    public async Task<AuthDto> CreateToken(string email)
    {
        var claims = new List<Claim>()
        {
            new(JwtRegisteredClaimNames.UniqueName, email),
            new(ClaimTypes.Role, "user"),
            new(ClaimTypes.Email, email)
        };

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials =  new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature)
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        var refresh = GenerateRefreshToken();
        return new AuthDto(_tokenHandler.WriteToken(token), refresh);
    }
    
    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
    
    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = _key,
            ValidateIssuer = false,
            ValidateAudience = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
        var jwtSecurityToken = securityToken as JwtSecurityToken;
        if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token");
        }
        
        return principal;
    }  
}