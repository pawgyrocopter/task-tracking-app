namespace TaskTrackingDB.Entities;

public class Project
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public List<User> Users { get; set; }
    
    public User CreatorUser { get; set; }
}