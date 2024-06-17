using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

public class TestController : BaseController
{
    private readonly ApplicationDbContext _context;

    public TestController(UserManager<User> userManager, ApplicationDbContext context) : base(userManager)
    {
        _context = context;
    }

    [HttpPost]
    [Authorize]
    public async Task UpdateUSerRole(Guid projectId, string email, string roleName)
    {
        var user = await _context.Users.Include(x => x.Projects)
            .Include(x => x.Roles).ThenInclude(userRole => userRole.Role).Include(user => user.Roles)
            .ThenInclude(userRole => userRole.Project)
            .FirstOrDefaultAsync(x => x.Email == CurrentUser.Email);

        var project = await _context.Projects.FirstOrDefaultAsync(x => x.Id == projectId);

        if (user.Roles.Exists(x => x.Role.Name == "Administrator" && x.Project.Id == project.Id))
        {
            var currentUserToChange =  await _context.Users.Include(x => x.Projects)
                .Include(x => x.Roles).ThenInclude(userRole => userRole.Role).Include(user => user.Roles)
                .ThenInclude(userRole => userRole.Project)
                .FirstOrDefaultAsync(x => x.Email == email);
            
            _context.Entry(currentUserToChange).State = EntityState.Modified;

            var userROle = new UserRole()
            {
                Project = project,
                Id = Guid.NewGuid(),
                User = currentUserToChange,
                ProjectId = project.Id,
                Role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == roleName)
            };

            using (_context.Database.BeginTransaction())
            {
                _context.Entry(currentUserToChange).State = EntityState.Modified;
                // _context.Entry(currentUserToChange).State = EntityState.Modified;
                currentUserToChange.Projects.Add(project);
                _context.Entry(userROle).State = EntityState.Added;
                currentUserToChange.Roles.Add(userROle);
            }
            
            await _context.SaveChangesAsync();
        }
    }
}