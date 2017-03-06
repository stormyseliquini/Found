namespace listItAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class undo31 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Pictures", "ProductId", "dbo.Products");
            DropIndex("dbo.Pictures", new[] { "ProductId" });
            AddColumn("dbo.Products", "ProductImage", c => c.String());
            DropTable("dbo.Pictures");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Pictures",
                c => new
                    {
                        PictureId = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        Uri = c.String(),
                    })
                .PrimaryKey(t => t.PictureId);
            
            DropColumn("dbo.Products", "ProductImage");
            CreateIndex("dbo.Pictures", "ProductId");
            AddForeignKey("dbo.Pictures", "ProductId", "dbo.Products", "ProductId");
        }
    }
}
