namespace TaskTackingAPI.DTOs.AuthDtos;

public record SignUpDto
{
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public string ConfirmPassword { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Name { get; set; }
}