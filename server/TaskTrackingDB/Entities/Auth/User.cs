using System;
using System.Collections.Generic;

namespace TaskTrackingDB.Entities;
using Microsoft.AspNetCore.Identity;

public class User : IdentityUser<Guid>
{
    public string Name { get; set; }
    
    public override string PhoneNumber { get; set; }
    
    public TelegramInfo TelegramInfo { get; set; }
    
    public Balance Balance { get; set; }

    public List<UserRole> Roles { get; set; } = [];

    public IEnumerable<Project> Projects { get; set; } = [];

    public User() : base()
    {
    }
}