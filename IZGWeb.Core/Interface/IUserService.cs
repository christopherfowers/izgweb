using System.Threading.Tasks;
using IZGWeb.Core.ServiceModel;

namespace IZGWeb.Core.Interface
{
    public interface IUserService
    {
        Task AddUser(AccountServiceModel userSM);
    }
}