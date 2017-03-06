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
        public virtual User User { get; set; }
        public virtual Product Product { get; set; }
    }
}