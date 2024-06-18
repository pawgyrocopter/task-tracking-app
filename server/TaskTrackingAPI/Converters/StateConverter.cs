using System.Text.Json;
using System.Text.Json.Serialization;
using TaskTrackingDB.Entities;

namespace TaskTackingAPI.Converters;

public class StateConverter : JsonConverter<State>
{
    public override State Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.Number:
            {
                var intValue = reader.GetInt32();
                if (Enum.IsDefined(typeof(State), intValue))
                {
                    return (State)intValue;
                }
                throw new JsonException("Invalid number value for State enum.");
            }
            case JsonTokenType.String:
            {
                var stringValue = reader.GetString();
                if (Enum.TryParse<State>(stringValue, true, out var state))
                {
                    return state;
                }
                throw new JsonException("Invalid string value for State enum.");
            }
            default:
                throw new JsonException("Invalid token type for State enum.");
        }
    }

    public override void Write(Utf8JsonWriter writer, State value, JsonSerializerOptions options)
    {
       writer.WriteNumberValue((int)value);
    }
}