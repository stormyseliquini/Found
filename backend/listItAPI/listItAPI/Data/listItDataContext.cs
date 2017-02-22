using listItAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace listItAPI.Data
{
    public class listItDataContext : DbContext
    {
        public listItDataContext() : base("listItDB")
        {

        }
        public IDbSet<User> Users { get; set; }
        public IDbSet<Product> Products { get; set; }
        public IDbSet<Message> Messages { get; set; }
        public IDbSet<Chat> Chats { get; set; }
        public IDbSet<Category> Categories { get; set; }
		public IDbSet<Bookmark> Bookmarks { get; set; }
		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			// User relationships
            // User-Products relationship
			modelBuilder.Entity<User>()
				.HasMany(u => u.Products)
				.WithRequired(p => p.User)
				.HasForeignKey(p => p.UserId);

            //User-Bookmarks relationship
			modelBuilder.Entity<User>()
			   .HasMany(u => u.Bookmarks)
			   .WithRequired(p => p.User)
			   .HasForeignKey(p => p.UserId);

            //Category-Product relationship

            modelBuilder.Entity<Category>()
               .HasMany(u => u.Products)
               .WithRequired(p => p.Category)
               .HasForeignKey(p => p.CategoryId);

            //Product-Bookmark relationship
            modelBuilder.Entity<Product>()
               .HasMany(u => u.Bookmarks)
               .WithRequired(p => p.Product)
               .HasForeignKey(p => p.ProductId);


            //User-Messages Relationships
            modelBuilder.Entity<User>()
                
                 .HasMany(u => u.Messages)
                 .WithRequired(m => m.User1)
                 .HasForeignKey(m => m.User1);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Messages)
                .WithRequired(m => m.User2)
                .HasForeignKey(m =>  m.User2 );





            //Message-Chat relationship
            modelBuilder.Entity<Message>()
                 .HasMany(c => c.Chats)
                 .WithRequired(c => c.Message)
                 .HasForeignKey(c => c.MessageId);



            base.OnModelCreating(modelBuilder);
		}
    }
}