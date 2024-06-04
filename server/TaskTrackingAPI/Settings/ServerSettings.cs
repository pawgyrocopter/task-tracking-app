namespace TaskTackingAPI.Settings;

public record ServerSettings
{
    public string AuthSecret { get; set; }
    
    public string ConnectionString { get; set; }
    public ServerSettings()
    {
        
    }
}