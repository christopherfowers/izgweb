using System;
using System.IdentityModel.Tokens.Jwt;
using Hanssens.Net;
using IZGWeb.Logger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;

namespace IZGWeb.Controllers
{
    [Route("api/[controller]")]
    public class UserManagementController : Controller
    {
        private IConfiguration _config;
        private ILogger _logger;

        public UserManagementController(IConfiguration config, ILogger logger)
        {
            _config = config;
            _logger = logger;
        }
        
        [Authorize("read:users")]
        [HttpGet("[action]")]
        public IActionResult Users()
        {   
            var token = GetToken();
            
            var client = new RestClient($"https://{_config["Auth0:Domain"]}/api/v2/users");
            var request = new RestRequest(Method.GET);
            request.AddHeader("authorization", JsonConvert.DeserializeObject<AccessToken>(token).ToString());
            IRestResponse response = client.Execute(request);
            _logger.LogEvent(DateTime.Now, $"Getting users. Response Code: {response.StatusCode}\r\n{response.Content}", "IZGWeb.UserManagementController.Users()", LogLevel.Debug);
            return Ok(response.Content);
        }

        [Authorize("read:users")]
        [HttpGet("[action]")]
        public IActionResult AllUserRoles()
        {
            var token = GetToken();
            
            var client = new RestClient($"https://{_config["Auth0:Domain"]}/api/v2/roles");
            var request = new RestRequest(Method.GET);
            request.AddHeader("authorization", JsonConvert.DeserializeObject<AccessToken>(token).ToString());
            IRestResponse response = client.Execute(request);
            
            return Ok(response.Content);
        }

        [Authorize("read:users")]
        [HttpGet("[action]")]
        public IActionResult UserRoles(string userId)
        {
            var token = GetToken();
            
            var client = new RestClient($"https://{_config["Auth0:Domain"]}/api/v2/users/{userId}/roles");
            var request = new RestRequest(Method.GET);
            request.AddHeader("authorization", JsonConvert.DeserializeObject<AccessToken>(token).ToString());
            IRestResponse response = client.Execute(request);
            
            return Ok(response.Content);
        }

        private string GetToken()
        {
            using var localStorage = new LocalStorage();
            var token = localStorage.Exists("apitoken") ? localStorage.Get<string>("apitoken") : "";
            if (!CheckToken(token))
            {
                token = RequestToken();
                localStorage.Store("apitoken", token);
            }
            _logger.LogEvent(DateTime.Now, $"Token Received: {token}", "IZGWeb.UserManagementController.GetToken()", LogLevel.Debug);
            return token;
        }
        
        private bool CheckToken(string token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            if (!jwtHandler.CanReadToken(token)) return false;

            var decodedToken = jwtHandler.ReadJwtToken(token);

            return decodedToken.ValidTo >= DateTime.Now;
        }

        private string RequestToken()
        {
            var client = new RestClient($"https://{_config["Auth0:Domain"]}/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", 
                "grant_type=client_credentials" +
                    $"&client_id={_config["Auth0:ClientId"]}" +
                    $"&client_secret={_config["Auth0:ClientSecret"]}" +
                    $"&audience=https://{_config["Auth0:Domain"]}/api/v2/", 
                ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            return response.Content;
        }
    }
}