namespace TaskTackingAPI.DTOs.AuthDtos;

public record SignInDto
{
    public string Email { get; set; }
    
    public string Password { get; set; }
}