namespace TaskTackingAPI.DTOs;

public class ProjectCreateDto
{
    public string Name { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }

    public List<UserDto> Users { get; set; } = [];
}