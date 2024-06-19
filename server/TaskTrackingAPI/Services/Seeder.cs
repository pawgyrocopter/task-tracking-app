using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskTackingAPI.Services.SeedGroup;
using TaskTrackingDB;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Services;

public class Seeder
{
    private readonly List<(string, string)> _projectsDesc = new()
    {
        ("CloudScribe",
            "A cloud-native note-taking application with real-time collaboration features. Built using ASP.NET Core, Postgres, and Docker."),
        ("Graphify",
            "A GraphQL API service that transforms complex data relationships into a graph structure. Utilizes TypeScript, Node.js, and Prisma."),
        ("WebPackster",
            "A custom Webpack configuration tool for optimizing frontend assets. Supports TypeScript, Babel, and code splitting."),
        ("MicroGateway",
            "A lightweight API gateway for microservices architecture. Handles authentication, rate limiting, and routing. Written in Go."),
        ("DataForge",
            "An ETL (Extract, Transform, Load) pipeline framework. Integrates with various data sources and destinations. Uses Python and Apache Airflow."),
        ("PixelPulse",
            "A pixel art animation tool for game developers. Supports frame-by-frame editing, layers, and export to popular game engines."),
        ("StreamFlow",
            "A real-time data streaming platform. Combines Kafka, Apache Flink, and Elasticsearch for processing and analytics."),
        ("SecureVault",
            "A secure credential management system. Encrypts and stores secrets for applications. Implemented in Rust."),
        ("EventHorizon",
            "An event-driven microservices architecture framework. Includes event sourcing, CQRS, and distributed tracing."),
        ("QuantumLeap",
            "A quantum computing simulator and educational platform. Allows users to experiment with quantum algorithms and gates.")
    };

    private readonly Dictionary<string, Role> _roles = new();

    private readonly List<User> _users = new List<User>
    {
        new User
        {
            Name = "John Doe", Email = "john.doe@example.com", UserName = "john.doe@example.com",
            NormalizedEmail = "JOHN.DOE@EXAMPLE.COM", PhoneNumber = "+1 123-456-7890"
        },
        new User
        {
            Name = "Alice Smith", Email = "alice.smith@example.com", UserName = "alice.smith@example.com",
            NormalizedEmail = "ALICE.SMITH@EXAMPLE.COM", PhoneNumber = "+44 20 1234 5678"
        },
        new User
        {
            Name = "Bob Johnson", Email = "bob.johnson@example.com", UserName = "bob.johnson@example.com",
            NormalizedEmail = "BOB.JOHNSON@EXAMPLE.COM", PhoneNumber = "+1 987-654-3210"
        },
        new User
        {
            Name = "Emily Brown", Email = "emily.brown@example.com", UserName = "emily.brown@example.com",
            NormalizedEmail = "EMILY.BROWN@EXAMPLE.COM", PhoneNumber = "+49 30 5555 1234"
        },
        new User
        {
            Name = "Michael Lee", Email = "michael.lee@example.com", UserName = "michael.lee@example.com",
            NormalizedEmail = "MICHAEL.LEE@EXAMPLE.COM", PhoneNumber = "+81 3 1234 5678"
        },
        new User
        {
            Name = "Sophia Wang", Email = "sophia.wang@example.com", UserName = "sophia.wang@example.com",
            NormalizedEmail = "SOPHIA.WANG@EXAMPLE.COM", PhoneNumber = "+86 10 8765 4321"
        },
        new User
        {
            Name = "Daniel Kim", Email = "daniel.kim@example.com", UserName = "daniel.kim@example.com",
            NormalizedEmail = "DANIEL.KIM@EXAMPLE.COM", PhoneNumber = "+82 2 9876 5432"
        },
        new User
        {
            Name = "Olivia Garcia", Email = "olivia.garcia@example.com", UserName = "olivia.garcia@example.com",
            NormalizedEmail = "OLIVIA.GARCIA@EXAMPLE.COM", PhoneNumber = "+34 91 234 5678"
        },
        new User
        {
            Name = "Liam Martinez", Email = "liam.martinez@example.com", UserName = "liam.martinez@example.com",
            NormalizedEmail = "LIAM.MARTINEZ@EXAMPLE.COM", PhoneNumber = "+52 55 1234 5678"
        },
        new User
        {
            Name = "Isabella Nguyen", Email = "isabella.nguyen@example.com", UserName = "isabella.nguyen@example.com",
            NormalizedEmail = "ISABELLA.NGUYEN@EXAMPLE.COM", PhoneNumber = "+1 408-555-1234"
        }
    };

    private static Dictionary<Guid, UserGroup> _userGroups = new();
    private ApplicationDbContext _context;

    private RoleManager<Role> _roleManager;
    private UserManager<User> _userManger;
    private readonly IServiceProvider _serviceProvider;

    public Seeder(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task Initialize()
    {
        using var scope = _serviceProvider.CreateScope();
        _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        if (await _context.Database.EnsureCreatedAsync() || _context.Users.Count() != 0)
            return;
        
        _roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
        _userManger = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

        foreach (var role in ApplicationDbContext.RoleNames)
        {
            var roleDb = await _context.Roles.FirstOrDefaultAsync(x => x.Name == role);
            if (roleDb is null)
            {
                var roleEntity = new Role() {Name = role};
                await _roleManager.CreateAsync(roleEntity);
                _roles.TryAdd(role, roleEntity);
            }
            else _roles.TryAdd(role, roleDb);
        }

        await _context.SaveChangesAsync();
        
        foreach (var user in _users)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            if (currentUser is null)
            {
                var result = await _userManger.CreateAsync(user, "string");
                if (result.Succeeded)
                {
                    _userGroups.TryAdd(user.Id, new UserGroup() {User = user});
                }
            }
            else
            {
                _userGroups.TryAdd(user.Id, new UserGroup() {User = user});
            }


            await _context.SaveChangesAsync();

            await foreach (var project in GetCreatedProject(Random.Shared.Next(0, _projectsDesc.Count),
                               _userGroups[user.Id]))
            {
                var a = project;
            }
        }
        
        foreach (var (_, user) in _userGroups)
        {
            using (_context.Database.BeginTransaction())
            {
                foreach (var (_, project) in user.CreatedProjects)
                {
                    _context.UserRoles.Add(new()
                    {
                        Id = Guid.NewGuid(),
                        User = user.User,
                        Project = project,
                        ProjectId = project.Id,
                        Role = _roles["Administrator"],
                    });
                }
        
                _context.Database.CommitTransaction();
            }
        
        
            foreach (var (_, project) in user.CreatedProjects)
            {
                var q = Random.Shared.Next(0, _users.Count);
                var currUsers = _userGroups.Take(q).Where(x => x.Value.User.Id != user.User.Id)
                    .Select(x => x.Value.User);
        
                var currproject = await _context.Projects.FirstOrDefaultAsync(x => x.Id == project.Id);
                currproject.Users.AddRange(currUsers.ToList());
                await _context.SaveChangesAsync();
            }
        }
        
        await _context.SaveChangesAsync();
    }

    public async IAsyncEnumerable<Project> GetCreatedProject(int number, UserGroup user)
    {
        for (var i = 0; i < number; i++)
        {
            if (_projectsDesc.Count == 0)
                yield return null;
            else
            {
                var randomIndex = Random.Shared.Next(0, _projectsDesc.Count - 1);
                var randomProject = _projectsDesc[randomIndex];

                var project = new Project()
                {
                    Id = Guid.NewGuid(),
                    Name = randomProject.Item1,
                    Description = randomProject.Item2,
                    Users = [],
                    Tasks = [],
                    CreatorUser = user.User,
                    StartDate = DateTime.UtcNow.AddDays(-20),
                    EndDate = DateTime.UtcNow.AddDays(100)
                };

                _context.Projects.Add(project);
                await _context.SaveChangesAsync();
                

                await _context.SaveChangesAsync();


                user.CreatedProjects.TryAdd(project.Id, project);
                _userGroups.TryAdd(user.User.Id, user);
                _projectsDesc.RemoveAt(randomIndex);

                yield return project;
            }
        }
    }
}