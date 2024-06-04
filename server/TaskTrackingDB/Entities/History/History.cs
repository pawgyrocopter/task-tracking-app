namespace TaskTrackingDB.Entities.History;

public class History
{
    public Guid Id { get; set; }
    
    public string Description { get; set; }
    
    public User User { get; set; }
    
    public DateTime Date { get; set; }
}