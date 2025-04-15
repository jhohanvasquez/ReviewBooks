using BookReview.Models;
using System.Collections.Generic;

namespace BookReview.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();
        int AddBook(Book book);
        int UpdateBook(Book book);
        Book GetBookData(int bookId);
        string DeleteBook(int bookId);
        List<Categories> GetCategories();
        List<Book> GetBooksAvailableInReview(int bookId);
    }
}
