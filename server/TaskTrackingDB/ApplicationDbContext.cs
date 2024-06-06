using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskTrackingDB.Entities;
using TaskTrackingDB.Entities.History;

namespace TaskTrackingDB;

public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
{
    // public DbSet<User> Users { get; set; }
    //
    // public DbSet<Role> Roles { get; set; }
    
    public DbSet<ProjectTask> Tasks { get; set; }
    
    public DbSet<Project> Projects { get; set; }
    
    public DbSet<ProjectHistory> ProjectHistories { get; set; }
    
    public DbSet<TaskHistory> TaskHistories { get; set; }
    
    public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }    
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Project>()
            .HasOne(x => x.CreatorUser);
        builder.Entity<Project>().HasMany(x => x.Users);

        builder.Entity<User>().HasMany<Project>(x => x.Projects);

        builder.Entity<Role>().HasData(
            new Role()
            {
                Id = Guid.NewGuid(),
                RoleName = "Manager"
            },
            new Role()
            {
                Id = Guid.NewGuid(),
                RoleName = "User"
            },
            new Role()
            {
                Id = Guid.NewGuid(),
                RoleName = "Admin"
            });
        
        base.OnModelCreating(builder);
    }
}
