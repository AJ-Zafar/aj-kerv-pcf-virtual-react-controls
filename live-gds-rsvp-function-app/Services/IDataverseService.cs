using LiveGdsRsvp.FunctionApp.Models;

namespace LiveGdsRsvp.FunctionApp.Services;

/// <summary>
/// Abstraction over Dataverse operations for RSVP data.
/// </summary>
public interface IDataverseService
{
    /// <summary>
    /// Retrieves the full scenario for a given invite token.
    /// Returns null if the token is not found.
    /// </summary>
    Task<ScenarioData?> GetScenarioByTokenAsync(string token, CancellationToken ct = default);

    /// <summary>
    /// Creates or updates the RSVP response and its related records.
    /// Returns the updated scenario, or throws if canEdit is false on an existing response.
    /// </summary>
    Task<ScenarioData> SubmitRsvpAsync(string token, SubmitRsvpRequest request, CancellationToken ct = default);
}
