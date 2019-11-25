using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace IZGWeb
{
    public class AccessToken
    {
        [JsonProperty("access_token")]
        public string Token { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("scope")]
        public string Scopes { get; set; }

        public override string ToString()
        {
            return TokenType + " " + Token;
        }
    }
}