using TaskTrackingDB.Entities;

namespace TaskTackingAPI.DTOs;

public class TaskCreateDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public string AssignedUserEmail { get; set; }
    
    public Priority Priority { get; set; }
    
    public State State { get; set; }
    
    public Guid? ProjectId { get; set; }
}