using System.ComponentModel.DataAnnotations;

namespace TodoCRUD.Models
{
    public class TodoList
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }
}
