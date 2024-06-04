using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

[Route("api/[controller]")]
public class TasksController : ControllerBase
{
     private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TasksController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<IEnumerable<List<TaskDto>>> GetTasks()
    {
        return await _context.Tasks.ProjectTo<List<TaskDto>>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        return _mapper.Map<TaskDto>(task);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTasks(Guid id, [FromBody]TaskDto taskDto)
    {
        var task = _context.Tasks.FirstOrDefault(x => x.Id == id);

        if (task is null)
            return BadRequest();
        
        _context.Entry(task).State = EntityState.Modified;
        try
        {
            task.Name = taskDto.Name;
            task.StartDate = task.StartDate;
            task.EndDate = task.EndDate;
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskExists(id))
            {
                return NotFound();
            }
        }

        return NoContent();
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskDto>> PostTask(TaskDto taskDto)
    {
        var task = _mapper.Map<ProjectTask>(taskDto);
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTask", new {id = task.Id}, task);
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<TaskDto>> DeleteTask(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return _mapper.Map<TaskDto>(task);
    }

    private bool TaskExists(Guid id)
    {
        return _context.Tasks.Any(e => e.Id == id);
    }
}