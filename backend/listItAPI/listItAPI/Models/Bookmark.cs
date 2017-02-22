using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class Bookmark
    {
        public int BookmarkId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public User User { get; set; }
        public Product Product { get; set; }
    }
}