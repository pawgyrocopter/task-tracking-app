using TaskTrackingDB.Entities;

namespace TaskTackingAPI.DTOs;

public class TaskDto
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public Priority Priority { get; set; }
    
    public State State { get; set; }
    
    public string CreatorEmail { get; set; }
    
    public string AssigneeEmail { get; set; }
}