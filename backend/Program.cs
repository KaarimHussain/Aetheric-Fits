using Appwrite;
using Appwrite.Models;
using Appwrite.Services;

var builder = WebApplication.CreateBuilder(args);
var client = new Client();

client
    .SetEndpoint(builder.Configuration["Appwrite:Endpoint"] ?? "http://localhost/v1") // Your Appwrite endpoint
    .SetProject(builder.Configuration["Appwrite:ProjectId"] ?? "your_project_id") // Your Appwrite project ID
    .SetKey(builder.Configuration["Appwrite:ApiKey"] ?? "your_api_key");// Your Appwrite API key;


// Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Your React app URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
// Use CORS
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
