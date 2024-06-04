namespace TaskTrackingDB.Entities;

public class UserRole
{
    public Guid Id { get; set; }
    
    public User User { get; set; }
    
    public Role Role { get; set; }
    
    public Project Project { get; set; }
}