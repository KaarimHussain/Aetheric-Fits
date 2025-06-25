using Appwrite;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class AppwriteService
    {
        public Client AppwriteClient { get; }
        public Users Users { get; }
        public Account Account { get; }

        public AppwriteService(IConfiguration configuration)
        {
            var endpoint = configuration["Appwrite:Endpoint"] ?? throw new InvalidOperationException("Appwrite Endpoint is not configured.");
            var projectId = configuration["Appwrite:ProjectId"] ?? throw new InvalidOperationException("Appwrite ProjectId is not configured.");
            var apiKey = configuration["Appwrite:ApiKey"] ?? throw new InvalidOperationException("Appwrite ApiKey is not configured.");

            AppwriteClient = new Client()
                .SetEndpoint(endpoint)
                .SetProject(projectId)
                .SetKey(apiKey);

            Users = new Users(AppwriteClient);
            Account = new Account(AppwriteClient);
        }

        // Method to get an Account service configured with a client-side JWT
        public Account GetClientSideAccountService(string jwt)
        {
            var client = new Client()
                .SetEndpoint(AppwriteClient.Config["endpoint"] as string)
                .SetProject(AppwriteClient.Config["project"] as string)
                .SetJWT(jwt); // Set the JWT for client-side operations

            return new Account(client);
        }
    }
}
