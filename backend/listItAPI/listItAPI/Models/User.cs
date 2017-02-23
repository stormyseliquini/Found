using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class User
    {
       
        public  int UserId { get; set; }
        [Required]
        public  string FirstName { get; set; }
        [Required]
        public  string LastName { get; set; }
        [Required]
        public  string UserName { get; set; }
        [Required]
        public  string Password { get; set; }
        [Required]
        public  string Email { get; set; }
        [StringLength(10)]
        public  string Phone { get; set; }
        public  string Image { get; set; }
        public  string Birthday { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
       
        public virtual ICollection<Bookmark> Bookmarks { get; set; }

       
    }
}