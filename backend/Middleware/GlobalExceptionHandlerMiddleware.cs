using backend.Models.DTOs;
using System.Net;
using System.Text.Json;
using Appwrite.exceptions;

namespace backend.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            ErrorResponse errorResponse;

            switch (exception)
            {
                case AppwriteException appwriteEx:
                    _logger.LogError(appwriteEx, "Appwrite Exception: {Message}", appwriteEx.Message);
                    context.Response.StatusCode = appwriteEx.Code ?? (int)HttpStatusCode.InternalServerError; // Use Appwrite's status code if available
                    errorResponse = new ErrorResponse(
                        "An Appwrite service error occurred.",
                        _env.IsDevelopment() ? appwriteEx.ToString() : appwriteEx.Message // More details in dev
                    );
                    break;

                case BadHttpRequestException badRequestEx: // Example for specific ASP.NET Core exceptions
                    _logger.LogWarning(badRequestEx, "Bad HTTP Request: {Message}", badRequestEx.Message);
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse = new ErrorResponse("Invalid request.", badRequestEx.Message);
                    break;

                // You can add more specific exception types here
                // case MyCustomException myCustomEx:
                //     _logger.LogWarning(myCustomEx, "Custom Application Exception: {Message}", myCustomEx.Message);
                //     context.Response.StatusCode = (int)HttpStatusCode.BadRequest; // Or whatever is appropriate
                //     errorResponse = new ErrorResponse("Application error.", myCustomEx.Message);
                //     break;

                default:
                    _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    errorResponse = new ErrorResponse(
                        "An unexpected server error occurred.",
                        _env.IsDevelopment() ? exception.ToString() : "Please contact support if the issue persists." // Generic message in prod
                    );
                    break;
            }

            var jsonResponse = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase // Ensure consistent casing with other API responses
            });

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
