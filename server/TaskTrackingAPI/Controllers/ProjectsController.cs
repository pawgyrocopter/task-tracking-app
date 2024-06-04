using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

[Route("api/[controller]")]
public class ProjectsController: ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ProjectsController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/Projects
    [HttpGet]
    public async Task<IEnumerable<List<ProjectDto>>> GetProjects()
    {
        return await _context.Projects.ProjectTo<List<ProjectDto>>(_mapper.ConfigurationProvider).ToListAsync();
    }

    // GET: api/Projects/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        return _mapper.Map<ProjectDto>(project);
    }

    // PUT: api/Projects/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProject(Guid id, [FromBody]ProjectDto projectDto)
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
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id))
            {
                return NotFound();
            }
        }

        return NoContent();
    }

    // POST: api/Projects
    [HttpPost]
    public async Task<ActionResult<Project>> PostProject(ProjectDto projectDto)
    {
        var project = _mapper.Map<Project>(projectDto);
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProject", new {id = project.Id}, project);
    }

    // DELETE: api/Projects/5
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