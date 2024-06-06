using System;

namespace TaskTrackingDB.Entities;

public class Transaction
{
    public Guid Id { get; set; }
    
    public int Amount { get; set; }
    
    public DateTime Date{ get; set; }
    
    public User User { get; set; }
}