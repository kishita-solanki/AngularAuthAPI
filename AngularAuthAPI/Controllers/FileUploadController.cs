using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly AppdbContext _authContext;

        public FileUploadController(AppdbContext appdbContext)
        {
            _authContext = appdbContext;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<Product>> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            if (!file.ContentType.StartsWith("image"))
                return BadRequest("only upload images");

            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            string fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("only jpg, jpeg, png format accepted.");

            const int maxFileSize = 5 * 1024 * 1024; // 5MB
            if (file.Length > maxFileSize)
                return BadRequest("only 5mb image accepted.");

            // Read file content into a byte array
            byte[] fileData;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                fileData = stream.ToArray();
            }

            // Save file information to the database
            var fileModel = new Product
            {
                FileName = file.FileName,
                ContentType = file.ContentType,
                Data = Convert.ToBase64String(fileData)
            };

            return fileModel;
        }


        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {
            var fileModel = _authContext.Products.FirstOrDefault(f => f.FileName == fileName);
            if (fileModel == null)
            {
                return NotFound();
            }

            // Convert Base64 string to byte array
            byte[] fileData = Convert.FromBase64String(fileModel.Data);

            return File(fileData, fileModel.ContentType, fileModel.FileName);
        }
    }
}
