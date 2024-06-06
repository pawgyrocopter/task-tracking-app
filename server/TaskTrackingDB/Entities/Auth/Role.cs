using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TaskTrackingDB.Entities;

public class Role : IdentityRole<Guid>
{
    public string RoleName { get; set; }
    
    public List<User> Users { get; set; }
}