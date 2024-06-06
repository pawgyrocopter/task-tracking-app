using System;
using Microsoft.AspNetCore.Identity;
using TaskTackingAPI.DTOs.AuthDtos;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Models;

public class UserModel
{
    public Guid Id { get; set; }
    
    public string Email { get; set; }
    
    public string Name { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Password { get; set; }

    public UserModel()
    {
        
    }
    
    public UserModel(SignUpDto signUpDto)
    {
        Email = signUpDto.Email;
        Password = signUpDto.Password;
        Name = signUpDto.Name;
        PhoneNumber = signUpDto.PhoneNumber;
        Id = Guid.NewGuid();
    }

    public User ToEntity()
    {
        return new()
        {
            Email = Email,
            Id = Id,
            Name = Name,
            PhoneNumber = PhoneNumber,
        };
    }
}