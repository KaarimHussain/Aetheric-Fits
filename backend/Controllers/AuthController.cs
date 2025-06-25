using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Appwrite.Services;
using Appwrite.Models;
using Appwrite.exceptions;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppwriteService _appwriteService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppwriteService appwriteService, ILogger<AuthController> logger)
        {
            _appwriteService = appwriteService;
            _logger = logger;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Appwrite Users.Create requires a unique ID for the user. We can generate one.
                // Or let Appwrite generate it by passing "unique()"
                var user = await _appwriteService.Users.Create(
                    userId: ID.Unique(),
                    email: request.Email,
                    password: request.Password,
                    name: request.Name
                );

                var response = new UserRegistrationResponse
                {
                    UserId = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Message = "User registered successfully."
                };
                return Ok(response);
            }
            catch (AppwriteException ex)
            {
                _logger.LogError(ex, "Appwrite exception during registration for email {Email}", request.Email);
                return StatusCode(ex.Code ?? 500, new ErrorResponse("Registration failed.", ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration for email {Email}", request.Email);
                return StatusCode(500, new ErrorResponse("An unexpected error occurred.", ex.Message));
            }
        }

        // GET: api/auth/me
        [Authorize] // Protect this endpoint
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            // The [Authorize] attribute ensures this code is only reached if a valid JWT is provided.
            // The JWT is available in HttpContext.User if needed, or can be extracted from the header.
            string? jwt = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            // While the [Authorize] attribute handles the primary auth check,
            // we still need the JWT to pass to Appwrite's Get() method via our service.
            if (string.IsNullOrEmpty(jwt))
            {
                // This case should ideally not be reached if [Authorize] is working correctly with a valid token.
                // However, it's a good safeguard or if token extraction logic changes.
                _logger.LogWarning("/api/auth/me was reached without a JWT in the header, despite [Authorize]. This could indicate a configuration issue.");
                return Unauthorized(new ErrorResponse("Authorization token was expected but not found after authorization filter."));
            }

            try
            {
                // Use the AppwriteService method that takes a JWT
                Account clientSideAccountService = _appwriteService.GetClientSideAccountService(jwt);
                User currentUser = await clientSideAccountService.Get();

                return Ok(new {
                    currentUser.Id,
                    currentUser.Email,
                    currentUser.Name,
                    currentUser.EmailVerification,
                    currentUser.Prefs
                    // Add any other fields you want to return
                });
            }
            catch (AppwriteException ex)
            {
                 _logger.LogError(ex, "Appwrite exception when fetching current user.");
                // Appwrite often returns 401 if the JWT is invalid or expired
                if (ex.Code == 401) {
                    return Unauthorized(new ErrorResponse("Invalid or expired token.", ex.Message));
                }
                return StatusCode(ex.Code ?? 500, new ErrorResponse("Error fetching user details.", ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error when fetching current user.");
                return StatusCode(500, new ErrorResponse("An unexpected error occurred.", ex.Message));
            }
        }
    }
}
