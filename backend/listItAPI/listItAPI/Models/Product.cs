using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class Product
    {
       
        public  int ProductId { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        [Required]
        public  string ProductTitle { get; set; }
        [Required]
        public  string Description { get; set; }
        [Required]
        public  string Condition { get; set; }
        
        public  string ProductImage { get; set; }
        [Required]
        public  int Price { get; set; }
        public virtual ICollection<Bookmark> Bookmarks { get; set; }
        public virtual User User { get; set; }
        public virtual Category Category { get; set; }
    }
}