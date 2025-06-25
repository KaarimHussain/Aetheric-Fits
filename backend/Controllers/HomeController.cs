using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    // It's common to prefix API controllers with "api"
    [Route("api/[controller]")]
    public class HomeController : ControllerBase // Changed from Controller to ControllerBase for API controllers
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // GET: api/home
        [HttpGet]
        public IActionResult Index()
        {
            return Ok("Welcome to the Aetheric Fits API! This is an unprotected endpoint.");
        }

        // GET: api/home/securedata
        [Authorize] // This endpoint now requires authentication
        [HttpGet("securedata")]
        public IActionResult GetSecureData()
        {
            // Example: Accessing user claims if needed
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Appwrite JWT 'sub' (subject) claim often maps to user ID
            var userEmail = User.FindFirstValue(ClaimTypes.Email); // Appwrite JWT 'email' claim

            _logger.LogInformation("Secure data accessed by user ID: {UserId}, Email: {UserEmail}", userId, userEmail);

            return Ok(new
            {
                Message = "This is secure data, only accessible by authenticated users.",
                UserIdFromToken = userId,
                UserEmailFromToken = userEmail,
                UserClaims = User.Claims.Select(c => new { c.Type, c.Value }).ToList() // Display all claims for debugging/info
            });
        }
    }
}
