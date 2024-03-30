namespace AngularAuthAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Created {  get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string Data { get; set; }
    }
}
