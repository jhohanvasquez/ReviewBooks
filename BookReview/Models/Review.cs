using System.ComponentModel.DataAnnotations;

namespace BookReview.Models
{
    public class Review
    {
        public int? ReviewId { get; set; }

        public int UserId { get; set; }

        public int BookID { get; set; }

        public int Rating { get; set; }

        public string? Comment { get; set; }

        public string? ReviewDate { get; set; }
    }
}
