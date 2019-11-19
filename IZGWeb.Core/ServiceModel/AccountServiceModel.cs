using System;

namespace IZGWeb.Core.ServiceModel
{
    public class AccountServiceModel
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ExternalId { get; set; }
        public bool IsActive { get; set; }
        public string ProfileImageUrl { get; set; }
    }
}