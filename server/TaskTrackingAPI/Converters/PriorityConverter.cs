using System.Text.Json;
using System.Text.Json.Serialization;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Converters;

public class PriorityConverter :  JsonConverter<Priority>
{
    public override Priority Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.Number:
            {
                var intValue = reader.GetInt32();
                if (Enum.IsDefined(typeof(Priority), intValue))
                {
                    return (Priority)intValue;
                }
                throw new JsonException("Invalid number value for State enum.");
            }
            case JsonTokenType.String:
            {
                var stringValue = reader.GetString()?.ToLower();
                if (Enum.TryParse<Priority>(stringValue, true, out var state))
                {
                    return state;
                }
                throw new JsonException("Invalid string value for State enum.");
            }
            default:
                throw new JsonException("Invalid token type for State enum.");
        }
    }

    public override void Write(Utf8JsonWriter writer, Priority value, JsonSerializerOptions options)
    {
       writer.WriteStringValue(value.ToString().ToUpper());
    }
}