using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace listItAPI.Models
{
    public class Search
    {
        public string CategoryName { get; set; }
        public string Keyword { get; set; }
        public string Condition { get; set; }
        public int MaxPrice { get; set; }
        public int MinPrice { get; set; }
    }
}