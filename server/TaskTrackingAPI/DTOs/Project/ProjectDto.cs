namespace TaskTackingAPI.DTOs;

public class ProjectDto
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public List<UserDto> Users { get; set; }
    
    public List<TaskDto> Tasks { get; set; }
    
    public UserDto CreatorUser { get; set; }
    
    public string Description { get; set; }
}