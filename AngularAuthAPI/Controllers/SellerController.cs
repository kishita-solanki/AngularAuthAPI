using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly AppdbContext _authContext;

        public SellerController(AppdbContext appdbContext)
        {
            _authContext = appdbContext;
        }

        [HttpGet("seller-list")]
        public async Task<ActionResult<IEnumerable<Seller>>> GetSellers()
        {
            if (_authContext.sellers == null)
            {
                return NotFound();
            }

            return await _authContext.sellers.ToListAsync();
        }

        [HttpGet("{id}", Name = "seller-list-byid")]
        public async Task<ActionResult<Seller>> GetSeller(int id)
        {
            if (_authContext.sellers == null)
            {
                return NotFound();
            }

            var seller = await _authContext.sellers.FindAsync(id);

            if (seller == null)
            {
                return NotFound();
            }

            return seller;
        }

        [HttpPost("add-seller")]
        public async Task<ActionResult<Seller>> PostSeller(Seller seller)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.sellers.Add(seller);
            await _authContext.SaveChangesAsync();

            return CreatedAtAction("GetSeller", new { id = seller.Id }, seller);
        }

        [HttpPut("{id}", Name = "edit-seller")]
        public async Task<IActionResult> PutSeller(int id, Seller seller)
        {
            if (id != seller.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authContext.Entry(seller).State = EntityState.Modified;

            try
            {
                await _authContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SellerExists(id))
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

        private bool SellerExists(int id)
        {
            return _authContext.sellers.Any(e => e.Id == id);
        }

        [HttpDelete("{id}", Name = "seller_delete_by_id")]
        public async Task<IActionResult> DeleteSeller(int id)
        {
            var seller = await _authContext.sellers.FindAsync(id);
            if (seller == null)
            {
                return NotFound();
            }

            _authContext.sellers.Remove(seller);
            await _authContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
