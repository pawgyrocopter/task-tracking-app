using System.Collections.Concurrent;
using System.Collections.Generic;
using TaskTackingAPI.Models;

namespace TaskTackingAPI.Services;

public sealed class Cache
{
    private readonly ConcurrentDictionary<string, User> _users = new ();

    public void AddUser(User user)
    {
        _users.TryAdd(user.Email, user);
    }

    public IEnumerable<User> GetUsers()
    {
        return _users.Values;
    }

    public User GetUser(string email)
    {
        return _users.GetValueOrDefault(email);
    }
}