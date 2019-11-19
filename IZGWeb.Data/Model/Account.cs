using System;
using System.Reflection;

namespace IZGWeb.Data.Model
{
    public class Account : BaseDocument
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ExternalId { get; set; }
        
        public DateTime LastLogin { get; set; }
        public DateTime FirstLogin { get; set; }
        public DateTime Created { get; set; }
        
        public string ProfileImageUrl { get; set; }
        
        public bool IsActive { get; set; }
        public DateTime ActiveStatusChangedOn { get; set; }
    }
}