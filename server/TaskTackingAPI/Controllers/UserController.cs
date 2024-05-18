using Microsoft.AspNetCore.Mvc;
using TaskTackingAPI.DTOs;
using TaskTackingAPI.Models;
using TaskTackingAPI.Services;

namespace TaskTackingAPI.Controllers;

[Route("users")]
public class UserController(Cache _cache)
{
    
    [HttpPost]
    public void AddUser(SignUpDto signUpDto)
    {
        _cache.AddUser(new User(){Id = Guid.NewGuid(), Email = signUpDto.Email});
    }
    
    [HttpGet("{email}")]
    public User GetUser(string email)
    {
        return _cache.GetUser(email);
    }
    
    [HttpGet]
    public  IEnumerable<User> GetUsers()
    {
        return _cache.GetUsers();
    }
}