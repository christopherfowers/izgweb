using System;
using System.Linq;
using System.Threading.Tasks;
using IZGWeb.Data.Model;
using IZGWeb.Utilities.Exceptions;
using IZGWeb.Core.Interface;
using IZGWeb.Core.ServiceModel;
using IZGWeb.Data.Interface;

namespace IZGWeb.Core
{
    public class UserService : IUserService
    {
        private readonly IRepository _repository;
        
        public UserService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task AddUser(AccountServiceModel userSm)
        {
            var existingUsers = _repository.Where<Account>(
                a => a.ExternalId == userSm.ExternalId || a.Username == userSm.Username || a.Email == userSm.Email)
                .ToArray();
            
            if (existingUsers.Length > 0)
            {
                var message = "User already exists. ";
                if (existingUsers[1].ExternalId == userSm.ExternalId) message += "User already registered";
                if (existingUsers[1].Username == userSm.Username) message += "Username " + userSm.Username + " already in use.";
                if (existingUsers[1].Email == userSm.Email) message += "Email " +  userSm.Email + " already in use.";
                throw new DuplicateUserException(message);
            }
            
            var user = new Account()
            {
                Username = userSm.Username,
                FirstName =  userSm.FirstName,
                LastName =  userSm.LastName,
                ExternalId =  userSm.ExternalId,
                Email =  userSm.Email,
                Created = DateTime.Now,
                ProfileImageUrl =  userSm.ProfileImageUrl,
                LastLogin =  DateTime.Now,
                IsActive =  true
            };
            
            await _repository.Add(user);
        }
    }
}