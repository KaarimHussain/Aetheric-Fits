namespace backend.Models.DTOs
{
    public class UserRegistrationResponse
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string? Name { get; set; }
        public string Message { get; set; }
    }
}
