

using BookReview.Interfaces;
using BookReview.Models;

namespace BookReview.DataAccess
{
    public class ReviewDataAccessLayer(ReviewDBContext dbContext) : IReviewService
    {
        readonly ReviewDBContext _dbContext = dbContext;
        public void CreateReviewlistItem(int userId, int bookId, string comment)
        {
            var existingReview = _dbContext.Review.FirstOrDefault(x => x.BookID == bookId && x.UserId == userId);
            if (existingReview != null)
            {
                _dbContext.Review.Remove(existingReview);
                _dbContext.SaveChanges();
            }
            else
            {
                Review ReviewItem = new Review
                {
                    BookID = bookId,
                    UserId = userId,
                    Comment = comment,
                    ReviewDate = DateTime.Now.ToString()
                };
                _dbContext.Review.Add(ReviewItem);
                _dbContext.SaveChanges();
            }
        }

        public int ClearReviewUser(int userId)
        {
            try
            {
                List<Review> ReviewItem = _dbContext.Review.Where(x => x.UserId == userId).ToList();

                foreach (Review item in ReviewItem)
                {
                    _dbContext.Review.Remove(item);
                    _dbContext.SaveChanges();
                }

                return 0;
            }
            catch
            {
                throw;
            }
        }

        public string GetReviewCommentUser(int userId)
        {
            try
            {
                var reviewlist = _dbContext.Review.FirstOrDefault(x => x.UserId == userId);

                if (reviewlist != null && !string.IsNullOrEmpty(reviewlist.Comment))
                {
                    return reviewlist.Comment;
                }
                else
                {
                    return string.Empty;
                }
            }
            catch
            {
                throw;
            }
        }
    }
}
