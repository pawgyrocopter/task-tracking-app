using AutoMapper;
using TaskTackingAPI.DTOs;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Settings;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Project, ProjectDto>();
        CreateMap<ProjectDto, Project>();
        
        CreateMap<ProjectTask, TaskDto>().ForMember(
            x => x.AssigneeEmail,
            y => y.MapFrom(q => q.AssignedUser.Email))
            .ForMember(x => x.CreatorEmail, 
                y=> y.MapFrom(q => q.CreatorUser.Email));
        CreateMap<TaskDto, ProjectTask>();

        CreateMap<UserDto, User>();
        CreateMap<User, UserDto>();

        CreateMap<Project, ProjectOverviewDto>().AfterMap((project, projectdto) =>
        {
            foreach (var task in projectdto.Tasks)
            {
                if (projectdto.StateCount.TryGetValue(task.State, out var count))
                {
                    projectdto.StateCount[task.State]++;
                }
                else
                    projectdto.StateCount.TryAdd(task.State, 1);
            }
        });
    }
}