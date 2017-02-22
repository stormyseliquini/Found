using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class Chat
    {
       
        public  int ChatId { get; set; }
        public int MessageId { get; set; }
        public  DateTime DateSent { get; set; }
        public  string Subject { get; set; }
        public  string Content { get; set; }
        public Message Message { get; set; }
    }
}