using BookReview.Interfaces;
using BookReview.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookReview.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController(IReviewService ReviewlistService, IBookService bookService, IUserService userService) : Controller
    {
        readonly IReviewService _ReviewlistService = ReviewlistService;
        readonly IBookService _bookService = bookService;

        /// <summary>
        /// Get the list of items in the Reviewlist
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>All the items in the Reviewlist</returns>
        [HttpGet("{bookId}")]
        public List<Book> Get(int bookId)
        {
            return _bookService.GetBooksAvailableInReview(bookId);
        }

        /// <summary>
        /// Toggle the items in Reviewlist. If item doesn't exists, it will be added to the Reviewlist else it will be removed.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bookId"></param>
        /// <returns>All the items in the Reviewlist</returns>
        [Authorize]
        [HttpPost]
        [Route("CreateReviewlist/{userId}/{bookId}/{comment}")]
        public List<Book> Post(int userId, int bookId, string comment)
        {
            _ReviewlistService.CreateReviewlistItem(userId, bookId, comment);
            return _bookService.GetBooksAvailableInReview(userId);
        }

        ///
        [HttpGet("GetReviewCommentUser/{userId}")]
        public string GetReviewCommentUser(int userId)
        {
            return _ReviewlistService.GetReviewCommentUser(userId);
        }

        /// <summary>
        /// Clear the Reviewlist
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete("{userId}")]
        public int Delete(int userId)
        {
            return _ReviewlistService.ClearReviewUser(userId);
        }
    }
}
