namespace TaskTrackingDB.Entities;

public class UserRefreshToken
{
    public Guid Id { get; set; }
    
    public string Email { get; set; }
    
    public string RefreshToken { get; set; }
    
    public bool IsActive { get; set; } = true;
}