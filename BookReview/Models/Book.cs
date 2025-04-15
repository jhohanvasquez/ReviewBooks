namespace BookReview.Models
{
    public partial class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string CoverFileName { get; set; }
    }
}
