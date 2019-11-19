using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Okta.Sdk;
using Okta.Sdk.Configuration;
using Okta.AspNetCore;

namespace ExplorrPWA.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private IConfiguration _configuration;
        private OktaClient _oktaClient;
        
        public AccountController(IConfiguration configuration)
        {
            _configuration = configuration;
            
            _oktaClient = new OktaClient(new OktaClientConfiguration
            {
                OktaDomain = _configuration["Okta:Domain"],
                Token = _configuration["Okta:ApiKey"]
            });
        }

        [HttpGet("[action]")]
        [Authorize]
        public IActionResult GetAccount()
        {
            var principal = HttpContext.User.Identity as ClaimsIdentity;

            var uid = principal.Claims
                .SingleOrDefault(c => c.Type == "uid")
                ?.Value;

            var res = _oktaClient.Users.GetUserAsync(uid).GetAwaiter().GetResult();

            return Ok(res.Profile);
        }
    }
}