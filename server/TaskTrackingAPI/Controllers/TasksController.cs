

using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
     private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TasksController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

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

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTasks(Guid id, [FromBody]TaskUpdateDto taskDto)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

        if (task is null)
            return BadRequest();
        
        _context.Entry(task).State = EntityState.Modified;
        try
        {
            task.Name = taskDto.Name;
            task.StartDate = task.StartDate;
            task.EndDate = task.EndDate;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == taskDto.AssignedUserEmail);
            task.AssignedUser = user;
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await TaskExists(id)))
                return NotFound();
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> PostTask([FromBody]TaskCreateDto taskDto)
    {
        var task = new ProjectTask()
        {
            Name = taskDto.Name,
            StartDate = taskDto.StartDate,
            EndDate = taskDto.EndDate,
        };
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == taskDto.AssignedUserEmail);
        task.AssignedUser = user;

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return _mapper.Map<TaskDto>(task);
    }

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

    private async Task<bool> TaskExists(Guid id)
    {
        return await _context.Tasks.AnyAsync(e => e.Id == id);
    }
}