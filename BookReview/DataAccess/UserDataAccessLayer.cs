using Microsoft.EntityFrameworkCore;
using BookReview.Dto;
using BookReview.Interfaces;
using BookReview.Models;

namespace BookReview.DataAccess
{
    public class UserDataAccessLayer(ReviewDBContext dbContext) : IUserService
    {
        readonly ReviewDBContext _dbContext = dbContext;

        public AuthenticatedUser AuthenticateUser(UserLogin loginCredentials)
        {
            AuthenticatedUser authenticatedUser = new();

            var userDetails = _dbContext.UserMaster.FirstOrDefault(
                u => u.Username == loginCredentials.Username && u.Password == loginCredentials.Password
                );

            if (userDetails != null)
            {

                authenticatedUser = new AuthenticatedUser
                {
                    Username = userDetails.Username,
                    UserId = userDetails.UserId,
                    UserTypeName = userDetails.UserTypeId == 1 ? "Admin" : "User"
                };
            }
            return authenticatedUser;
        }

        public async Task<bool> RegisterUser(UserMaster userData)
        {
            bool isUserNameAvailable = CheckUserNameAvailabity(userData.Username);
            try
            {
                if (isUserNameAvailable)
                {
                    await _dbContext.UserMaster.AddAsync(userData);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUserNameAvailabity(string userName)
        {
            UserMaster user = _dbContext.UserMaster.FirstOrDefault(x => x.Username == userName);

            return user == null;
        }

        public async Task<bool> isUserExists(int userId)
        {
            UserMaster user = await _dbContext.UserMaster.FirstOrDefaultAsync(x => x.UserId == userId);

            return user != null;
        }
    }
}
