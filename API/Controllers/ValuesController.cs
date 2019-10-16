using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        public DataContext Context { get; }
        public ValuesController(DataContext context)
        {
            this.Context = context;
        }

        //GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            // use async when making database calls
            var values = await Context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(int id)
        {
            var value = await Context.Values.FindAsync(id);
            return Ok(value);
        }
    }
}