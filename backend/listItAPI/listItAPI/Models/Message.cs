using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        // [Column("UserId")]
        [ForeignKey("Users")]
        [Required]
        public User User1 { get; set; }

       // [Column("UserId")]
        [ForeignKey("Users")]
        [Required]
        public User User2 { get; set; }
        
       

        


        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Chat> Chats { get; set; }

    }
}