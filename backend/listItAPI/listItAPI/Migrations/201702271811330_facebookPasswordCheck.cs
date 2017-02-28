namespace listItAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class facebookPasswordCheck : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "FbPassword", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "FbPassword");
        }
    }
}
