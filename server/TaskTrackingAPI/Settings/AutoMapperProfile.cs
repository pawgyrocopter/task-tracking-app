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
        
        CreateMap<ProjectTask, TaskDto>();
        CreateMap<TaskDto, ProjectTask>();
    }
}