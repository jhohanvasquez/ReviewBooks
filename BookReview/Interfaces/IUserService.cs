using BookReview.Dto;
using BookReview.Models;
using System.Threading.Tasks;

namespace BookReview.Interfaces
{
    public interface IUserService
    {
        AuthenticatedUser AuthenticateUser(UserLogin loginCredentials);
        Task<bool> RegisterUser(UserMaster userData);
        bool CheckUserNameAvailabity(string userName);

        Task<bool> isUserExists(int userId);
    }
}
