namespace BookReview.Interfaces
{
    public interface IReviewService
    {
        void CreateReviewlistItem(int userId, int bookId, string comment);
        int ClearReviewUser(int userId);
        string GetReviewCommentUser(int userId);

    }
}
