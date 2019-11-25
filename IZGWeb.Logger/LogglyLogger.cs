using System;
using RestSharp;

namespace IZGWeb.Logger
{
    public class LogglyLogger : ILogger
    {
        private string _key;
        public LogglyLogger(string key)
        {
            _key = key;
        }
        
        public void LogEvent(DateTime logTime, string message, string source, LogLevel logLevel)
        {   
            var client = new RestClient($"https://logs-01.loggly.com/inputs/{_key}/tag/http");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddJsonBody(new { message = message, eventDateTime = logTime, loglevel = logLevel});
            Console.WriteLine("LOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING\rLOGGING");
            var response = client.Execute(request);
            Console.WriteLine(response.StatusCode);
        }
    }
}