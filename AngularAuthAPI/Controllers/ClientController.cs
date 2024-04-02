using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly AppdbContext _authContext;

        public ClientController(AppdbContext appdbContext)
        {
            _authContext = appdbContext;
        }

        [HttpGet("client-list")]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            if (_authContext.clients == null)
            {
                return NotFound();
            }

            return await _authContext.clients.ToListAsync();
        }

        [HttpGet("{id}", Name = "client-list-byid")]
        public async Task<ActionResult<Client>> GetClients(int id)
        {
            if (_authContext.clients == null)
            {
                return NotFound();
            }

            var client = await _authContext.clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpPost("add-client")]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.clients.Add(client);
            await _authContext.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = client.Id }, client);
        }

        [HttpPut("{id}", Name = "edit-client")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.Entry(client).State = EntityState.Modified;

            try
            {
                await _authContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool ClientExists(int id)
        {
            return _authContext.clients.Any(e => e.Id == id);
        }

        [HttpDelete("{id}", Name = "client_delete_by_id")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _authContext.clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _authContext.clients.Remove(client);
            await _authContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
