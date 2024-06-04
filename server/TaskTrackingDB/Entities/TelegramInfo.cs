namespace TaskTrackingDB.Entities;

public class TelegramInfo
{
    public Guid Id { get; set; }
    
    public string UserName { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public DateTime LastActiveTime { get; set; }
}