using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
// System.Text was not strictly needed for this JWT setup with Authority.
using backend.Middleware; // Add this for the error handling middleware

var builder = WebApplication.CreateBuilder(args);

// Configure Appwrite Service
builder.Services.AddSingleton<AppwriteService>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    return new AppwriteService(configuration);
});

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var appwriteEndpoint = builder.Configuration["Appwrite:Endpoint"] ?? throw new InvalidOperationException("Appwrite Endpoint is not configured for JWT Authority.");
        var appwriteProjectId = builder.Configuration["Appwrite:ProjectId"] ?? throw new InvalidOperationException("Appwrite ProjectId is not configured for JWT Audience.");

        // The Authority should be the base URL of your Appwrite instance's API.
        // e.g., "https://cloud.appwrite.io/v1" or "http://localhost/v1" for self-hosted.
        // The middleware will attempt to find OIDC discovery document or JWKS URI relative to this.
        // Appwrite's JWKS URI is typically [Authority]/keys
        options.Authority = appwriteEndpoint;
        options.Audience = appwriteProjectId; // The "aud" claim in Appwrite JWTs is the Project ID.

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, // Validates the 'iss' claim.
            ValidIssuer = appwriteEndpoint, // The 'iss' claim in Appwrite JWTs
            ValidateAudience = true, // Validates the 'aud' claim.
            ValidAudience = appwriteProjectId, // The 'aud' claim
            ValidateLifetime = true, // Checks token expiration.
            ValidateIssuerSigningKey = true, // This is critical.
            // IssuerSigningKey will be fetched from JWKS endpoint discovered via Authority.
            // ClockSkew = TimeSpan.Zero // Optional: use if clock synchronization is an issue
        };
        // For debugging token validation errors:
        // options.Events = new JwtBearerEvents
        // {
        //     OnAuthenticationFailed = context =>
        //     {
        //         Console.WriteLine("Authentication failed: " + context.Exception.Message);
        //         return Task.CompletedTask;
        //     },
        //     OnTokenValidated = context => {
        //         Console.WriteLine("Token validated for: " + context.Principal.Identity.Name);
        //         return Task.CompletedTask;
        //     }
        // };
    });

builder.Services.AddAuthorization();

// Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(builder.Configuration["AllowedOrigins"] ?? "http://localhost:3000") // Your React app URL, consider making this configurable
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi(); // This was in your original code, ensure you need it or have the package for it. Default template might use AddSwaggerGen
builder.Services.AddEndpointsApiExplorer(); // Common for Swagger/OpenAPI
builder.Services.AddSwaggerGen(); // Common for Swagger/OpenAPI

var app = builder.Build();

// Configure the HTTP request pipeline.

// Add global error handling middleware early in the pipeline
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    // app.MapOpenApi(); // This was from your original template. Ensure it's what you need.
    // Standard Swagger UI setup:
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Use CORS
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

// Authentication must come before Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
