namespace TaskTackingAPI.DTOs;

public class ProjectUpdateDto
{
    public string Name { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public List<UserDto> UsersToAdd { get; set; }
    
    public List<UserDto> UsersToRemove { get; set; }
}