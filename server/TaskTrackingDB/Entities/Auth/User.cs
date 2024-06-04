namespace TaskTrackingDB.Entities;
using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public Guid Id { get; set; }
    
    public string Email { get; set; }
    
    public string Name { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Password { get; set; }
    
    public TelegramInfo TelegramInfo { get; set; }
    
    public Balance Balance { get; set; }
    
    public List<UserRole> Roles { get; set; }
    
    public List<Project> Projects { get; set; }

    public User()
    {
        
    }
}