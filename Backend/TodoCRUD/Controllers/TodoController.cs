using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoCRUD.Models;

namespace TodoCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoListDbContext _todolistDbContext;

        public TodoController(TodoListDbContext todolistDbContext)
        {
            this._todolistDbContext = todolistDbContext;
        }

        [HttpGet]
        [Route("GetTodo")]
        public async Task<IEnumerable<TodoList>> GetTodos()
        {
            return await _todolistDbContext.TodoList.ToListAsync();
        }

        [HttpPost]
        [Route("AddTodo")]
        public async Task<TodoList> AddTodo(TodoList objTodoList)
        {
            _todolistDbContext.TodoList.Add(objTodoList);
            await _todolistDbContext.SaveChangesAsync();
            return objTodoList;
        }

        [HttpPatch]
        [Route("UpdateTodo/{id}")]
        public async Task<TodoList> UpdateTodo(TodoList objTodoList)
        {
            _todolistDbContext.Entry(objTodoList).State = EntityState.Modified;
            await _todolistDbContext.SaveChangesAsync();
            return objTodoList;
        }

        [HttpDelete]
        [Route("DeleteTodo/{id}")]
        public bool DeleteTodo(int id)
        {
            bool a = false;
            var todolist = _todolistDbContext.TodoList.Find(id);
            if (todolist != null)
            {
                a = true;
                _todolistDbContext.Entry(todolist).State = EntityState.Deleted;
                _todolistDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }


    }
}
