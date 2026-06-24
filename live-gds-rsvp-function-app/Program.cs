using Azure.Identity;
using LiveGdsRsvp.FunctionApp.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.PowerPlatform.Dataverse.Client;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices((context, services) =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        // Register Dataverse ServiceClient using Managed Identity
        services.AddSingleton<ServiceClient>(sp =>
        {
            var dataverseUrl = context.Configuration["DataverseUrl"]
                ?? throw new InvalidOperationException("DataverseUrl configuration is missing.");

            var clientId = context.Configuration["ManagedIdentityClientId"];

            TokenCredential credential = string.IsNullOrEmpty(clientId)
                ? new ManagedIdentityCredential()           // system-assigned
                : new ManagedIdentityCredential(clientId);  // user-assigned

            return new ServiceClient(
                tokenProviderFunction: async _ =>
                {
                    var token = await credential.GetTokenAsync(
                        new Azure.Core.TokenRequestContext(
                            new[] { $"{dataverseUrl}/.default" }
                        ),
                        CancellationToken.None
                    );
                    return token.Token;
                },
                instanceUrl: new Uri(dataverseUrl),
                useUniqueInstance: false
            );
        });

        services.AddScoped<IDataverseService, DataverseService>();
    })
    .Build();

await host.RunAsync();
