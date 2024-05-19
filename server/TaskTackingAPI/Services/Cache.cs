using System.Collections.Concurrent;
using System.Collections.Generic;
using TaskTackingAPI.Models;

namespace TaskTackingAPI.Services;

public sealed class Cache
{
    private readonly ConcurrentDictionary<string, UserModel> _users = new ();

    public void AddUser(UserModel userModel)
    {
        _users.TryAdd(userModel.Email, userModel);
    }

    public IEnumerable<UserModel> GetUsers()
    {
        return _users.Values;
    }

    public UserModel GetUser(string email)
    {
        return _users.GetValueOrDefault(email);
    }
}