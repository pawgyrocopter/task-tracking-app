namespace TaskTackingAPI.DTOs;

public class ProjectCreateDto
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }

    public List<UserDto> Users { get; set; } = [];
}