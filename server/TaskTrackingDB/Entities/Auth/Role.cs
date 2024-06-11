using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TaskTrackingDB.Entities;

public class Role : IdentityRole<Guid>
{
    public List<User> Users { get; set; }
}