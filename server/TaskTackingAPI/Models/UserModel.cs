using System;
using Microsoft.AspNetCore.Identity;

namespace TaskTackingAPI.Models;

public class UserModel
{
    public Guid Id { get; set; }
    
    public string Email { get; set; }
    
    public string Name { get; set; }
}