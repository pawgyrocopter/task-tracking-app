using System.ComponentModel.DataAnnotations;

namespace TaskTackingAPI.DTOs;

public record LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}