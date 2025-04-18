﻿using BookReview.Interfaces;
using BookReview.Models;
using Microsoft.EntityFrameworkCore;

namespace BookReview.DataAccess
{
    public class BookDataAccessLayer(ReviewDBContext dbContext) : IBookService
    {
        readonly ReviewDBContext _dbContext = dbContext;

        public List<Book> GetAllBooks()
        {
            try
            {
                var result = _dbContext.Book.AsNoTracking().ToList();
                return result;
            }
            catch
            {
                throw;
            }
        }

        public int AddBook(Book book)
        {
            try
            {
                _dbContext.Book.Add(book);
                _dbContext.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateBook(Book book)
        {
            try
            {
                Book oldBookData = GetBookData(book.BookId);

                if (oldBookData.CoverFileName != null)
                {
                    if (book.CoverFileName == null)
                    {
                        book.CoverFileName = oldBookData.CoverFileName;
                    }
                }

                _dbContext.Entry(book).State = EntityState.Modified;
                _dbContext.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Book GetBookData(int bookId)
        {
            try
            {
                Book book = _dbContext.Book.FirstOrDefault(x => x.BookId == bookId);
                if (book != null)
                {
                    _dbContext.Entry(book).State = EntityState.Detached;
                    return book;
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public string DeleteBook(int bookId)
        {
            try
            {
                Book book = _dbContext.Book.Find(bookId);
                _dbContext.Book.Remove(book);
                _dbContext.SaveChanges();

                return book.CoverFileName;
            }
            catch
            {
                throw;
            }
        }

        public List<Categories> GetCategories()
        {
            List<Categories> lstCategories = new List<Categories>();
            lstCategories = (from CategoriesList in _dbContext.Categories select CategoriesList).ToList();

            return lstCategories;
        }

        public List<Book> GetSimilarBooks(int bookId)
        {
            List<Book> lstBook = new List<Book>();
            Book book = GetBookData(bookId);

            lstBook = _dbContext.Book.Where(x => x.Category == book.Category && x.BookId != book.BookId)
                .OrderBy(u => Guid.NewGuid())
                .Take(5)
                .ToList();
            return lstBook;
        }

        public List<Book> GetBooksAvailableInReview(int bookId)
        {
            try
            {
                List<Book> cartItemList = new List<Book>();
                var reviewItems = _dbContext.Review.Where(x => x.BookID == bookId).ToList();

                foreach (var item in reviewItems)
                {
                    Book book = GetBookData(item.BookID);
                    cartItemList.Add(book);
                }
                return cartItemList;
            }
            catch
            {
                throw;
            }
        }

    }
}
