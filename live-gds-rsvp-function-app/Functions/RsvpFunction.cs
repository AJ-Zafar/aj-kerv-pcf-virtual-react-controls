using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using LiveGdsRsvp.FunctionApp.Helpers;
using LiveGdsRsvp.FunctionApp.Models;
using LiveGdsRsvp.FunctionApp.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace LiveGdsRsvp.FunctionApp.Functions;

public class RsvpFunction(IDataverseService dataverseService, ILogger<RsvpFunction> logger)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
    };

    // ── GET /api/rsvp/{token} ────────────────────────────────────────────

    [Function("GetRsvp")]
    public async Task<HttpResponseData> GetRsvp(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rsvp/{token}")] HttpRequestData req,
        string token,
        FunctionContext context)
    {
        logger.LogInformation("GET /api/rsvp/{Token}", token);

        if (!TokenValidator.IsValid(token))
        {
            return await BadRequest(req, "INVALID_TOKEN", "The invite token format is invalid.");
        }

        try
        {
            var scenario = await dataverseService.GetScenarioByTokenAsync(token, context.CancellationToken);

            if (scenario is null)
            {
                return await NotFound(req, "TOKEN_NOT_FOUND", "No invitation found for this token.");
            }

            return await Ok(req, scenario);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled error retrieving RSVP for token {Token}", token);
            return await InternalError(req, "An unexpected error occurred. Please try again later.");
        }
    }

    // ── POST /api/rsvp/{token}/submit ────────────────────────────────────

    [Function("SubmitRsvp")]
    public async Task<HttpResponseData> SubmitRsvp(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "rsvp/{token}/submit")] HttpRequestData req,
        string token,
        FunctionContext context)
    {
        logger.LogInformation("POST /api/rsvp/{Token}/submit", token);

        if (!TokenValidator.IsValid(token))
        {
            return await BadRequest(req, "INVALID_TOKEN", "The invite token format is invalid.");
        }

        SubmitRsvpRequest? body;
        try
        {
            body = await JsonSerializer.DeserializeAsync<SubmitRsvpRequest>(
                req.Body, JsonOptions, context.CancellationToken);
        }
        catch (JsonException ex)
        {
            logger.LogWarning(ex, "Invalid JSON body for token {Token}", token);
            return await BadRequest(req, "INVALID_BODY", "The request body could not be parsed as JSON.");
        }

        if (body is null)
        {
            return await BadRequest(req, "EMPTY_BODY", "A request body is required.");
        }

        // Ensure token in URL matches body (defence-in-depth)
        if (!string.Equals(body.Token, token, StringComparison.Ordinal))
        {
            return await BadRequest(req, "TOKEN_MISMATCH", "The token in the URL does not match the request body.");
        }

        try
        {
            var updated = await dataverseService.SubmitRsvpAsync(token, body, context.CancellationToken);
            return await Ok(req, updated);
        }
        catch (KeyNotFoundException ex)
        {
            logger.LogWarning(ex, "Token not found: {Token}", token);
            return await NotFound(req, "TOKEN_NOT_FOUND", "No invitation found for this token.");
        }
        catch (UnauthorizedAccessException ex)
        {
            logger.LogWarning(ex, "Edit not allowed for token: {Token}", token);
            return await Forbidden(req, "EDIT_NOT_ALLOWED", ex.Message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled error submitting RSVP for token {Token}", token);
            return await InternalError(req, "An unexpected error occurred. Please try again later.");
        }
    }

    // ── Response helpers ─────────────────────────────────────────────────

    private static async Task<HttpResponseData> Ok<T>(HttpRequestData req, T body)
    {
        var res = req.CreateResponse(HttpStatusCode.OK);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await res.WriteStringAsync(JsonSerializer.Serialize(body, JsonOptions));
        return res;
    }

    private static async Task<HttpResponseData> BadRequest(HttpRequestData req, string code, string message)
    {
        var res = req.CreateResponse(HttpStatusCode.BadRequest);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await res.WriteStringAsync(JsonSerializer.Serialize(new ApiError(code, message), JsonOptions));
        return res;
    }

    private static async Task<HttpResponseData> NotFound(HttpRequestData req, string code, string message)
    {
        var res = req.CreateResponse(HttpStatusCode.NotFound);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await res.WriteStringAsync(JsonSerializer.Serialize(new ApiError(code, message), JsonOptions));
        return res;
    }

    private static async Task<HttpResponseData> Forbidden(HttpRequestData req, string code, string message)
    {
        var res = req.CreateResponse(HttpStatusCode.Forbidden);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await res.WriteStringAsync(JsonSerializer.Serialize(new ApiError(code, message), JsonOptions));
        return res;
    }

    private static async Task<HttpResponseData> InternalError(HttpRequestData req, string message)
    {
        var res = req.CreateResponse(HttpStatusCode.InternalServerError);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await res.WriteStringAsync(JsonSerializer.Serialize(
            new ApiError("INTERNAL_ERROR", message), JsonOptions));
        return res;
    }
}
