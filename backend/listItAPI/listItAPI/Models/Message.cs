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

         public int UserId1 { get; set; }
   
         public int UserId2 { get; set;}

        [ForeignKey("UserId1")]
        [InverseProperty("Messages")]
        public virtual User User1 { get; set; }
        [ForeignKey("UserId2")]
        public virtual User User2 { get; set; }

        public virtual ICollection<Chat> Chats { get; set; }
   

    }
}