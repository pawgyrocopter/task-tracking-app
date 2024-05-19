using Microsoft.EntityFrameworkCore;
using TaskTrackingDB.Entities;

namespace TaskTrackingDB;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }    
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
