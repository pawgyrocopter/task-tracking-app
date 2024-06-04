using TaskTrackingDB.Entities;

namespace TaskTackingAPI.DTOs;

public class TaskDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
}