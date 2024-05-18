using System;
using Microsoft.AspNetCore.Identity;

namespace TaskTackingAPI.Models;

public class User
{
    public Guid Id { get; set; }
    
    public string Email { get; set; }
}