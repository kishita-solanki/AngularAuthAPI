namespace AngularAuthAPI.Models
{
    public class Seller
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string Data { get; set; }
    }
}
