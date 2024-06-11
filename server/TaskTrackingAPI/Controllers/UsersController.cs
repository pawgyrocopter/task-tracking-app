using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Controllers;

public class UsersController : BaseController
{
    public UsersController(UserManager<User> userManager) : base(userManager)
    {
    }
}