namespace TaskTrackingDB.Entities;

public class Balance
{
    public Guid Id { get; set; }
    
    public int CurrentBalance { get; set; }
    
    public string Currency { get; set; }
}