using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class UserRegistrationRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)] // Appwrite default minimum password length
        public string Password { get; set; }

        public string? Name { get; set; }
    }
}
