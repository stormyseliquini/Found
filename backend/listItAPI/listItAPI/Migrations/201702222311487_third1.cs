namespace listItAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class third1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "ProductImage", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "ProductImage", c => c.String(nullable: false));
        }
    }
}
