using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.DTOs;
using TaskTackingAPI.DTOs.AuthDtos;
using TaskTackingAPI.Services;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

public class UsersController : BaseController
{
    private readonly JwtService _jwtService;
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UsersController(UserManager<User> userManager, JwtService jwtService, ApplicationDbContext context, IMapper mapper) : base(userManager)
    {
        _jwtService = jwtService;
        _context = context;
        _mapper = mapper;
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult> UpdateUser([FromBody] UserUpdateDto userUpdateDto)
    {
        if (CurrentUser is null)
            return Unauthorized();

        CurrentUser.Email = userUpdateDto.Email ?? CurrentUser.Email;
        CurrentUser.UserName = userUpdateDto.Email ?? CurrentUser.UserName;
        CurrentUser.Name = userUpdateDto.Name ?? CurrentUser.Name;
        CurrentUser.PhoneNumber = userUpdateDto.PhoneNumber ?? CurrentUser.PhoneNumber;

        var passHash = _userManager.PasswordHasher.HashPassword(CurrentUser, userUpdateDto.Password);
        CurrentUser.PasswordHash = passHash;
        
        return Ok("User updated");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers(Guid? projectId)
    {
        if (projectId is null)
        {
            return  _context.Users.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToList();
        }
        
        var project = await _context.Projects.Include(x => x.Users).FirstOrDefaultAsync(x => x.Id == projectId);
        
        return project.Users.AsQueryable().ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToList();
    }

    [HttpPut("role")]
    [Authorize]
    public async Task UpdateUserRole(Guid projectId, string email, string roleName)
    {
        var user = await _context.Users.Include(x => x.Projects)
            .Include(x => x.Roles).ThenInclude(userRole => userRole.Role).Include(user => user.Roles)
            .ThenInclude(userRole => userRole.Project)
            .FirstOrDefaultAsync(x => x.Email == CurrentUser.Email);

        var project = await _context.Projects.FirstOrDefaultAsync(x => x.Id == projectId);
        var userRole = user.Roles.FirstOrDefault(x => x.Project.Id == project.Id);
        if (CheckRoles(userRole, roleName))
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

        static bool CheckRoles(UserRole userRole, string roleName) => userRole.Role.Name switch
        {
            ApplicationDbContext.Administrator => true,
            ApplicationDbContext.Manager when roleName is ApplicationDbContext.Manager or ApplicationDbContext.Collaborator => true,
            _ => false
        };
    }
}