using Microsoft.AspNetCore.Mvc;
using BookReview.Models;
using BookReview.Interfaces;

namespace BookReview.Controllers
{
    [Route("api/[controller]")]
    public class UserController(IUserService userService) : Controller
    {
        readonly IUserService _userService = userService;

        /// <summary>
        /// Check the availability of the username
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("validateUserName/{userName}")]
        public bool ValidateUserName(string userName)
        {
            return _userService.CheckUserNameAvailabity(userName);
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="registrationData"></param>
        [HttpPost]
        public ActionResult Post([FromBody] UserRegistration registrationData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            UserMaster user = new()
            {
                FirstName = registrationData.FirstName,
                LastName = registrationData.LastName,
                Username = registrationData.Username,
                Password = registrationData.Password,
                Gender = registrationData.Gender,
                UserTypeId = 2
            };

            _userService.RegisterUser(user);

            return Ok();
        }
    }
}
