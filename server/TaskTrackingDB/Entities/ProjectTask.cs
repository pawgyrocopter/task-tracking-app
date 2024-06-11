using System;

namespace TaskTrackingDB.Entities;

public class ProjectTask
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    
    public Priority Priority { get; set; }
    
    public State State { get; set; }
    
    public Project Project { get; set; }
    
    public User AssignedUser { get; set; }
    
    public User CreatorUser { get; set; }
}