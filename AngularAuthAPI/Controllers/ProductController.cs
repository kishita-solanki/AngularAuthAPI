using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppdbContext _authContext;

        public ProductController(AppdbContext appdbContext)
        {
            _authContext = appdbContext;
        }

        [HttpGet("product-list")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_authContext.Products == null)
            {
                return NotFound();
            }

            return await _authContext.Products.ToListAsync();
        }

        [HttpGet("{id}", Name = "product-list-byid")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_authContext.Products == null)
            {
                return NotFound();
            }

            var product = await _authContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost("add-product")]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.Products.Add(product);
            await _authContext.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}", Name = "edit-product")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.Entry(product).State = EntityState.Modified;

            try
            {
                await _authContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        private bool ProductExists(int id)
        {
            return _authContext.Products.Any(e => e.Id == id);
        }

        [HttpDelete("{id}", Name = "delete_by_id")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _authContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _authContext.Products.Remove(product);
            await _authContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
