namespace TaskTackingAPI.DTOs;

public class TaskCreateDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public string AssignedUserEmail { get; set; }
}