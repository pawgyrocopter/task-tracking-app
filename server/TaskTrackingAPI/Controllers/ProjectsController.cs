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

[Route("api/[controller]")]
[Authorize]
public class ProjectsController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public ProjectsController(ApplicationDbContext context, IMapper mapper, UserManager<User> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<List<ProjectDto>> GetProjects()
    {
        return await _context.Projects.Include(x => x.Tasks).Include(x => x.Users).ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
            return NotFound();

        return _mapper.Map<ProjectDto>(project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProject(Guid id, [FromBody]ProjectUpdateDto projectDto)
    {
        var project = _context.Projects.FirstOrDefault(x => x.Id == id);

        if (project is null)
            return BadRequest();
        
        _context.Entry(project).State = EntityState.Modified;
        
        try
        {
            project.Name = projectDto.Name;
            project.StartDate = project.StartDate;
            project.EndDate = project.EndDate;

            foreach (var user in projectDto.UsersToAdd)
            {
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
                if (dbUser is not null)
                    project.Users.Add(dbUser);
            }
            
            foreach (var user in projectDto.UsersToRemove)
            {
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
                if (dbUser is not null)
                    project.Users.Remove(dbUser);
            }
            
            await _context.SaveChangesAsync();
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
            Name = projectDto.Name
        };

        var email = User.FindFirst(ClaimTypes.Email).Value;
        var currentUser = await _userManager.FindByNameAsync(email);
        
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
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return _mapper.Map<ProjectDto>(project);
    }

    private bool ProjectExists(Guid id)
    {
        return _context.Projects.Any(e => e.Id == id);
    }
}