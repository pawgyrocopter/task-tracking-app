using Microsoft.AspNetCore.Identity;

namespace TaskTrackingDB.Entities;

public class Role : IdentityRole
{
    public Guid Id { get; set; }
    
    public string RoleName { get; set; }
    
    public List<User> Users { get; set; }
}