using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TaskTackingAPI.DTOs;
using TaskTackingAPI.Models;
using TaskTackingAPI.Services;
using TaskTrackingDB;

namespace TaskTackingAPI.Controllers;

[Route("users")]
public class UserController(Cache _cache, ApplicationDbContext context)
{
    
    [HttpPost]
    public void AddUser(SignUpDto signUpDto)
    {
        _cache.AddUser(new UserModel(){Id = Guid.NewGuid(), Email = signUpDto.Email});
        context.Users.Add(new TaskTrackingDB.Entities.User() {Id = Guid.NewGuid(), Email = signUpDto.Email});
        context.SaveChanges();
    }
    
    [HttpGet("{email}")]
    public UserModel GetUser(string email)
    {
        return _cache.GetUser(email);
    }
    
    [HttpGet]
    public  IEnumerable<TaskTrackingDB.Entities.User> GetUsers()
    {
        return context.Users.ToList();
    }
}