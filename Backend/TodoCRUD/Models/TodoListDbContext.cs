using Microsoft.EntityFrameworkCore;

namespace TodoCRUD.Models
{
    public class TodoListDbContext : DbContext
    {
        public TodoListDbContext(DbContextOptions<TodoListDbContext> options) : base(options)
        {
        }

        // create database
        public DbSet<TodoList> TodoList { get; set; }

        //creating a database connection
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //adding database connection
            optionsBuilder.UseSqlServer("Data Source=M_ABISHANI\\SQLEXPRESS; Initial Catalog=todoListDb; User Id=dora; password=4561; TrustServerCertificate=True");
        }
    }
}
