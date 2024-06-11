using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Services.SeedGroup;

public class UserGroup
{
    public User User { get; set; }

    public Dictionary<Guid, ProjectTask> CreatedTasks { get; set; } = [];
    public Dictionary<Guid, ProjectTask> AssignedTasks { get; set; } = [];

    public Dictionary<Guid, Project> CreatedProjects { get; set; } = [];
    public Dictionary<Guid, Project> CollaboratedProjects { get; set; } = [];
    
    public UserGroup()
    {
        
    }
}