using System.Security.Claims;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

[Authorize]
public class ProjectsController: BaseController
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public ProjectsController(ApplicationDbContext context, IMapper mapper, UserManager<User> userManager) : base(userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetProjects()
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == CurrentUser.Email);

        if (user is null)
            return NotFound();
        
        var projects = _context.Projects
            .Include(x => x.Users)
            .Include(x => x.Tasks)
            .Where(x => x.CreatorUser.Email == user.Email || x.Users.FirstOrDefault(x => x.Email == user.Email) != null).Select(x => x);
        return projects.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).ToList();
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
    {
        var project = await _context.Projects
            .Include(x => x.Users)
            .Include(x => x.Tasks)
            .FirstOrDefaultAsync(x => x.Id == id);
        return  _mapper.Map<ProjectDto>(project);
    }


    [HttpGet("{email}")]
    public async Task<ActionResult<List<ProjectDto>>> GetUserProjects(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

        if (user is null)
            return NotFound();
        
        var projects = _context.Projects
            .Include(x => x.Users)
            .Include(x => x.Tasks)
            .Where(x => x.CreatorUser.Email == user.Email || x.Users.FirstOrDefault(x => x.Email == user.Email) != null).Select(x => x);
        return projects.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).ToList();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectDto>> PutProject(Guid id, [FromBody]ProjectUpdateDto projectDto)
    {
        var project = _context.Projects
            .Include(x => x.Users)
            .Include(x => x.Tasks).FirstOrDefault(x => x.Id == id);

        if (project is null)
            return BadRequest();
        
        _context.Entry(project).State = EntityState.Modified;
        
        try
        {
            project.Name = projectDto.Name;
            project.StartDate = project.StartDate;
            project.EndDate = project.EndDate;

            project.Users = [];
            foreach (var user in projectDto.Users)
            {
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
                if (dbUser is not null)
                    project.Users.Add(dbUser);
            }
            
            // foreach (var user in projectDto.UsersToAdd)
            // {
            //     var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            //     if (dbUser is not null)
            //         project.Users.Add(dbUser);
            // }
            //
            // foreach (var user in projectDto.UsersToRemove)
            // {
            //     var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            //     if (dbUser is not null)
            //         project.Users.Remove(dbUser);
            // }
            
            await _context.SaveChangesAsync();

            return _mapper.Map<ProjectDto>(project);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id))
                return NotFound();
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> PostProject([FromBody]ProjectCreateDto projectDto)
    {
        var project = new Project()
        {
            EndDate = projectDto.EndDate,
            StartDate = projectDto.StartDate,
            Name = projectDto.Name,
            CreatorUser = CurrentUser,
            Description = projectDto.Description
        };
        
        foreach (var user in projectDto?.Users)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            if (dbUser is not null)
                project.Users.Add(dbUser);
        }
        
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return _mapper.Map<ProjectDto>(project);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ProjectDto>> DeleteProject(Guid id)
    {
        var project = await _context.Projects.Include(x => x.Tasks)
            .Include(x => x.Users).FirstOrDefaultAsync(x => x.Id == id);
        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return _mapper.Map<ProjectDto>(project);
    }

    [HttpGet("{projectId:guid}/tasks")]
    public async Task<ActionResult<List<TaskDto>>> GetProjectTasks(Guid projectId)
    {
        var project = await _context.Projects.Include(x => x.Tasks).FirstOrDefaultAsync(x => x.Id == projectId);

        if (project is null)
            return NotFound();

        return _mapper.Map<List<TaskDto>>(project.Tasks);
    }
    
    [HttpGet("{projectId:guid}/overview")]
    public async Task<ActionResult<ProjectOverviewDto>> GetProjectOverview(Guid projectId)
    {
        var project = await _context.Projects
            .Include(x => x.Tasks)
            .Include(x => x.Users)
            .FirstOrDefaultAsync(x => x.Id == projectId);

        if (project is null)
            return NotFound();

        return _mapper.Map<ProjectOverviewDto>(project);
    }
    
    private bool ProjectExists(Guid id)
    {
        return _context.Projects.Any(e => e.Id == id);
    }
}