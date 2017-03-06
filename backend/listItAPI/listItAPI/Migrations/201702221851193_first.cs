namespace listItAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class first : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bookmarks",
                c => new
                    {
                        BookmarkId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.BookmarkId)
                .ForeignKey("dbo.Products", t => t.ProductId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ProductId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        ProductTitle = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        Condition = c.String(nullable: false),
                        ProductImage = c.String(nullable: false),
                        Price = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ProductId)
                .ForeignKey("dbo.Categories", t => t.CategoryId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                    })
                .PrimaryKey(t => t.CategoryId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        UserName = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        Email = c.String(nullable: false),
                        Phone = c.String(maxLength: 10),
                        Image = c.String(),
                        Birthday = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        MessageId = c.Int(nullable: false, identity: true),
                        UserId1 = c.Int(nullable: false),
                        UserId2 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MessageId)
                .ForeignKey("dbo.Users", t => t.UserId1)
                .ForeignKey("dbo.Users", t => t.UserId2)
                .Index(t => t.UserId1)
                .Index(t => t.UserId2);
            
            CreateTable(
                "dbo.Chats",
                c => new
                    {
                        ChatId = c.Int(nullable: false, identity: true),
                        MessageId = c.Int(nullable: false),
                        DateSent = c.DateTime(nullable: false),
                        Subject = c.String(),
                        Content = c.String(),
                    })
                .PrimaryKey(t => t.ChatId)
                .ForeignKey("dbo.Messages", t => t.MessageId)
                .Index(t => t.MessageId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "UserId", "dbo.Users");
            DropForeignKey("dbo.Messages", "UserId2", "dbo.Users");
            DropForeignKey("dbo.Messages", "UserId1", "dbo.Users");
            DropForeignKey("dbo.Chats", "MessageId", "dbo.Messages");
            DropForeignKey("dbo.Bookmarks", "UserId", "dbo.Users");
            DropForeignKey("dbo.Products", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Bookmarks", "ProductId", "dbo.Products");
            DropIndex("dbo.Chats", new[] { "MessageId" });
            DropIndex("dbo.Messages", new[] { "UserId2" });
            DropIndex("dbo.Messages", new[] { "UserId1" });
            DropIndex("dbo.Products", new[] { "CategoryId" });
            DropIndex("dbo.Products", new[] { "UserId" });
            DropIndex("dbo.Bookmarks", new[] { "ProductId" });
            DropIndex("dbo.Bookmarks", new[] { "UserId" });
            DropTable("dbo.Chats");
            DropTable("dbo.Messages");
            DropTable("dbo.Users");
            DropTable("dbo.Categories");
            DropTable("dbo.Products");
            DropTable("dbo.Bookmarks");
        }
    }
}
