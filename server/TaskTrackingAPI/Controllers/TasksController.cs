

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
public class TasksController : BaseController
{
     private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TasksController(ApplicationDbContext context, IMapper mapper, UserManager<User> userManager): base(userManager)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<List<TaskDto>> GetTasks()
    {
        return await _context.Tasks.ProjectTo<TaskDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{email}")]
    public async Task<ActionResult<List<TaskDto>>> GetTasks(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

        if (user is null)
            return NotFound();
        
        var tasks = _context.Tasks.Where(x => x.AssignedUser.Email == user.Email).Select(x => x);

        return await tasks.ProjectTo<TaskDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDto>> PutTasks(Guid id, [FromBody]TaskUpdateDto taskDto)
    {
        var task = await _context.Tasks
            .Include(x => x.AssignedUser).FirstOrDefaultAsync(x => x.Id == id);

        if (task is null)
            return BadRequest();
        
        _context.Entry(task).State = EntityState.Modified;
        try
        {
            task.Name = taskDto.Name ?? task.Name;
            task.StartDate = taskDto.StartDate ?? task.StartDate;
            task.EndDate = taskDto.EndDate ?? task.EndDate;
            task.Priority = taskDto.Priority ?? task.Priority;
            task.State = taskDto.State ?? task.State;
            task.Description = taskDto.Description ?? task.Description;

            if (taskDto.AssignedUserEmail is not null)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == taskDto.AssignedUserEmail);
                task.AssignedUser = user;
            }
           
            await _context.SaveChangesAsync();

            return _mapper.Map<TaskDto>(task);
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
        var project = await _context.Projects.FirstOrDefaultAsync(x => x.Id == taskDto.ProjectId);

        if (project is null)
            return NotFound("Project doesn't exist");
        
        var task = new ProjectTask()
        {
            Name = taskDto.Name,
            StartDate = taskDto.StartDate,
            EndDate = taskDto.EndDate,
            CreatorUser = CurrentUser,
            Priority = taskDto.Priority,
            Project = project,
            Description = taskDto.Description
        };

        if (taskDto.AssignedUserEmail is not null)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == taskDto.AssignedUserEmail);
            task.AssignedUser = user;
        }

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