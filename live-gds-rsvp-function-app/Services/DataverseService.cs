using LiveGdsRsvp.FunctionApp.Models;
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace LiveGdsRsvp.FunctionApp.Services;

/// <summary>
/// Dataverse service implementation using the Power Platform ServiceClient.
/// All Dataverse logical names (fcdo_*) match the schema in tablesasjsonlinkedtorsvp.md.
/// </summary>
public class DataverseService(ServiceClient client) : IDataverseService
{
    // ── Table / field logical names ──────────────────────────────────────

    // fcdo_invitation
    private const string T_Invitation = "fcdo_invitation";
    private const string F_InvToken = "fcdo_invitetoken";
    private const string F_InvMaxGuests = "fcdo_maxguestsallowed";
    private const string F_InvGuestEmailRequired = "fcdo_guestemailrequired";
    private const string F_InvNamedOnly = "fcdo_namedinviteonly";
    private const string F_InvAllowEditContact = "fcdo_allowinviteereditecontactdetails";
    private const string F_InvStatus = "fcdo_invitestatus";
    private const string F_InvEventLookup = "fcdo_event";
    private const string F_InvContactLookup = "fcdo_contact";
    private const string F_InvCurrentResponse = "fcdo_currentresponse";

    // fcdo_event
    // Fields confirmed present in metadata: fcdo_name, fcdo_startdatetime, fcdo_enddatetime,
    // fcdo_eventstatus, fcdo_capacity, fcdo_waitlistenabled, fcdo_qrcodeenabled,
    // fcdo_editrsvpallowed, fcdo_dietaryrequirementsenabled,
    // fcdo_accessibilityrequirementsenabled, fcdo_approvalrequired, fcdo_rsvpdeadline.
    // Fields NOT present: description, locationtype, locationname, locationaddress,
    // virtualjoinurl, organisername — these are returned as empty string.
    private const string T_Event = "fcdo_event";
    private const string F_EvName = "fcdo_name";
    private const string F_EvStart = "fcdo_startdatetime";
    private const string F_EvEnd = "fcdo_enddatetime";
    private const string F_EvDeadline = "fcdo_rsvpdeadline";
    private const string F_EvStatus = "fcdo_eventstatus";
    private const string F_EvCapacity = "fcdo_capacity";
    private const string F_EvWaitlist = "fcdo_waitlistenabled";
    private const string F_EvQrCode = "fcdo_qrcodeenabled";
    private const string F_EvEditAllowed = "fcdo_editrsvpallowed";
    private const string F_EvDietary = "fcdo_dietaryrequirementsenabled";
    private const string F_EvAccessibility = "fcdo_accessibilityrequirementsenabled";
    private const string F_EvApproval = "fcdo_approvalrequired";

    // fcdo_rsvpresponse
    private const string T_Response = "fcdo_rsvpresponse";
    private const string F_RespInvitation = "fcdo_invitation";
    private const string F_RespStatus = "fcdo_attendancestatus";
    private const string F_RespSubmitted = "fcdo_submittedon";
    private const string F_RespDeclined = "fcdo_declinedreason";
    private const string F_RespCanEdit = "fcdo_canedit";
    private const string F_RespCheckedIn = "fcdo_checkedin";
    private const string F_RespName = "fcdo_name";

    // fcdo_attendee
    private const string T_Attendee = "fcdo_attendee";
    private const string F_AttResponse = "fcdo_rsvpresponse";
    private const string F_AttType = "fcdo_attendeetype";
    private const string F_AttFirstName = "fcdo_firstname";
    private const string F_AttLastName = "fcdo_lastname";
    private const string F_AttEmail = "fcdo_email";
    private const string F_AttDietary = "fcdo_dietaryrequirement";
    private const string F_AttDietaryOther = "fcdo_dietaryrequirementother";
    private const string F_AttAccessibility = "fcdo_accessibilityrequirement";
    private const string F_AttAccessibilityOther = "fcdo_accessibilityrequirementother";
    private const string F_AttQrCode = "fcdo_qrcodevalue";
    private const string F_AttCheckedIn = "fcdo_checkedin";
    private const string F_AttName = "fcdo_name";

    // fcdo_eventquestion
    private const string T_Question = "fcdo_eventquestion";
    private const string F_QEvent = "fcdo_event";
    private const string F_QText = "fcdo_questiontext";
    private const string F_QHelp = "fcdo_helptext";
    private const string F_QType = "fcdo_questiontype";
    private const string F_QRequired = "fcdo_required";
    private const string F_QOrder = "fcdo_displayorder";
    private const string F_QAppliesTo = "fcdo_appliesto";
    private const string F_QOptions = "fcdo_options";

    // fcdo_eventquestionanswer
    private const string T_Answer = "fcdo_eventquestionanswer";
    private const string F_AResponse = "fcdo_rsvpresponse";
    private const string F_AQuestion = "fcdo_eventquestion";
    private const string F_AAttendee = "fcdo_attendee";
    private const string F_AValue = "fcdo_value";
    private const string F_AName = "fcdo_name";

    // ── Public methods ───────────────────────────────────────────────────

    public async Task<ScenarioData?> GetScenarioByTokenAsync(string token, CancellationToken ct = default)
    {
        // 1. Find invitation by token
        var invQuery = new QueryExpression(T_Invitation)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        invQuery.Criteria.AddCondition(F_InvToken, ConditionOperator.Equal, token);

        var invResult = await client.RetrieveMultipleAsync(invQuery, ct);
        if (invResult.Entities.Count == 0) return null;

        var invEntity = invResult.Entities[0];
        var invitationId = invEntity.Id;
        var eventRef = invEntity.GetAttributeValue<EntityReference>(F_InvEventLookup);
        if (eventRef is null) return null;

        // 2. Retrieve event + remaining data in parallel
        var eventTask = client.RetrieveAsync(T_Event, eventRef.Id, new ColumnSet(true), ct);
        var responseTask = GetResponseByInvitationAsync(invitationId, ct);
        var questionTask = GetEventQuestionsAsync(eventRef.Id, ct);

        await Task.WhenAll(eventTask, responseTask, questionTask);

        var eventEntity = eventTask.Result;
        var (responseEntity, attendees, answers) = responseTask.Result;

        var gdsEvent = MapEvent(eventEntity);
        var gdsInvitation = MapInvitation(invEntity, responseEntity?.Id.ToString());
        var gdsResponse = responseEntity is not null
            ? MapResponse(responseEntity)
            : EmptyResponse(invitationId.ToString());
        var gdsAttendees = attendees.Select(MapAttendee).ToList();
        var gdsQuestions = questionTask.Result.Select(MapQuestion).ToList();
        var gdsAnswers = answers.Select(MapAnswer).ToList();

        return new ScenarioData(gdsEvent, gdsInvitation, gdsResponse, gdsAttendees, gdsQuestions, gdsAnswers);
    }

    public async Task<ScenarioData> SubmitRsvpAsync(string token, SubmitRsvpRequest request, CancellationToken ct = default)
    {
        // 1. Find invitation
        var invQuery = new QueryExpression(T_Invitation)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        invQuery.Criteria.AddCondition(F_InvToken, ConditionOperator.Equal, token);

        var invResult = await client.RetrieveMultipleAsync(invQuery, ct);
        if (invResult.Entities.Count == 0)
            throw new KeyNotFoundException($"Invitation not found for token.");

        var invEntity = invResult.Entities[0];
        var invitationId = invEntity.Id;

        // 2. Check existing response
        var (existingResponse, existingAttendees, existingAnswers) = await GetResponseByInvitationAsync(invitationId, ct);

        if (existingResponse is not null && !existingResponse.GetAttributeValue<bool>(F_RespCanEdit))
            throw new UnauthorizedAccessException("This RSVP response cannot be edited.");

        // 3. Upsert response
        var responseEntity = existingResponse ?? new Entity(T_Response);
        responseEntity[F_RespInvitation] = new EntityReference(T_Invitation, invitationId);
        responseEntity[F_RespStatus] = new OptionSetValue(MapAttendanceStatusToOptionSet(request.AttendanceStatus));
        responseEntity[F_RespDeclined] = request.DeclinedReason ?? string.Empty;
        responseEntity[F_RespSubmitted] = DateTime.UtcNow;
        responseEntity[F_RespName] = $"RSVP - {request.PrimaryAttendee.LastName}, {request.PrimaryAttendee.FirstName}";

        Guid responseId;
        if (existingResponse is null)
        {
            responseId = await client.CreateAsync(responseEntity, ct);
        }
        else
        {
            responseId = existingResponse.Id;
            await client.UpdateAsync(responseEntity, ct);
        }

        // 4. Upsert primary attendee
        await UpsertAttendeeAsync(responseId, request.PrimaryAttendee, "primary", existingAttendees, ct);

        // 5. Upsert guest attendees
        foreach (var guest in request.Guests)
        {
            await UpsertAttendeeAsync(responseId, guest, "guest", existingAttendees, ct);
        }

        // 6. Remove guests that are no longer in the request
        var requestedAttendeeIds = request.Guests
            .Select(g => g.AttendeeId)
            .Concat(new[] { request.PrimaryAttendee.AttendeeId })
            .ToHashSet();

        foreach (var existing in existingAttendees)
        {
            if (!requestedAttendeeIds.Contains(existing.Id.ToString()))
            {
                await client.DeleteAsync(T_Attendee, existing.Id, ct);
            }
        }

        // 7. Upsert question answers
        foreach (var kvp in request.QuestionAnswers)
        {
            await UpsertAnswerAsync(responseId, kvp.Key, kvp.Value, existingAnswers, ct);
        }

        // 8. Return updated scenario
        var updated = await GetScenarioByTokenAsync(token, ct);
        return updated!;
    }

    // ── Private helpers ──────────────────────────────────────────────────

    private async Task<(Entity? response, List<Entity> attendees, List<Entity> answers)> GetResponseByInvitationAsync(
        Guid invitationId, CancellationToken ct)
    {
        var responseQuery = new QueryExpression(T_Response)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        responseQuery.Criteria.AddCondition(F_RespInvitation, ConditionOperator.Equal, invitationId);

        var responseResult = await client.RetrieveMultipleAsync(responseQuery, ct);
        var responseEntity = responseResult.Entities.FirstOrDefault();

        if (responseEntity is null)
            return (null, [], []);

        var responseId = responseEntity.Id;

        var attendeeQuery = new QueryExpression(T_Attendee)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        attendeeQuery.Criteria.AddCondition(F_AttResponse, ConditionOperator.Equal, responseId);

        var answerQuery = new QueryExpression(T_Answer)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        answerQuery.Criteria.AddCondition(F_AResponse, ConditionOperator.Equal, responseId);

        var attendeeTask = client.RetrieveMultipleAsync(attendeeQuery, ct);
        var answerTask = client.RetrieveMultipleAsync(answerQuery, ct);
        await Task.WhenAll(attendeeTask, answerTask);

        return (responseEntity, attendeeTask.Result.Entities.ToList(), answerTask.Result.Entities.ToList());
    }

    private async Task<List<Entity>> GetEventQuestionsAsync(Guid eventId, CancellationToken ct)
    {
        var q = new QueryExpression(T_Question)
        {
            ColumnSet = new ColumnSet(true),
            Criteria = new FilterExpression()
        };
        q.Criteria.AddCondition(F_QEvent, ConditionOperator.Equal, eventId);
        q.AddOrder(F_QOrder, OrderType.Ascending);

        var result = await client.RetrieveMultipleAsync(q, ct);
        return result.Entities.ToList();
    }

    private async Task UpsertAttendeeAsync(
        Guid responseId,
        AttendeeFormData attendeeData,
        string attendeeType,
        List<Entity> existingAttendees,
        CancellationToken ct)
    {
        var existing = existingAttendees.FirstOrDefault(a =>
            a.Id.ToString() == attendeeData.AttendeeId ||
            (a.GetAttributeValue<OptionSetValue>(F_AttType)?.Value == MapAttendeeTypeToOptionSet(attendeeType) &&
             attendeeType == "primary"));

        var entity = existing ?? new Entity(T_Attendee);
        entity[F_AttResponse] = new EntityReference(T_Response, responseId);
        entity[F_AttType] = new OptionSetValue(MapAttendeeTypeToOptionSet(attendeeType));
        entity[F_AttFirstName] = attendeeData.FirstName;
        entity[F_AttLastName] = attendeeData.LastName;
        entity[F_AttEmail] = attendeeData.Email;
        entity[F_AttDietary] = new OptionSetValue(MapDietaryToOptionSet(attendeeData.DietaryRequirement));
        entity[F_AttDietaryOther] = attendeeData.DietaryRequirementOther;
        entity[F_AttAccessibility] = attendeeData.AccessibilityRequirement;
        entity[F_AttAccessibilityOther] = attendeeData.AccessibilityRequirementOther;
        entity[F_AttName] = $"{attendeeData.FirstName} {attendeeData.LastName}";

        if (existing is null)
            await client.CreateAsync(entity, ct);
        else
            await client.UpdateAsync(entity, ct);
    }

    private async Task UpsertAnswerAsync(
        Guid responseId,
        string answerKey,
        string value,
        List<Entity> existingAnswers,
        CancellationToken ct)
    {
        // Key format: questionId  OR  questionId:attendeeId
        var parts = answerKey.Split(':', 2);
        var questionIdStr = parts[0];
        var attendeeIdStr = parts.Length > 1 ? parts[1] : null;

        if (!Guid.TryParse(questionIdStr, out var questionId)) return;
        Guid? attendeeId = attendeeIdStr is not null && Guid.TryParse(attendeeIdStr, out var aid) ? aid : null;

        var existing = existingAnswers.FirstOrDefault(a =>
        {
            var qRef = a.GetAttributeValue<EntityReference>(F_AQuestion);
            var aRef = a.GetAttributeValue<EntityReference>(F_AAttendee);
            return qRef?.Id == questionId && aRef?.Id == (attendeeId ?? Guid.Empty);
        });

        var entity = existing ?? new Entity(T_Answer);
        entity[F_AResponse] = new EntityReference(T_Response, responseId);
        entity[F_AQuestion] = new EntityReference(T_Question, questionId);
        if (attendeeId.HasValue)
            entity[F_AAttendee] = new EntityReference(T_Attendee, attendeeId.Value);
        entity[F_AValue] = value;
        entity[F_AName] = $"Answer-{questionIdStr}";

        if (existing is null)
            await client.CreateAsync(entity, ct);
        else
            await client.UpdateAsync(entity, ct);
    }

    // ── Mapping helpers ──────────────────────────────────────────────────

    private static GdsEvent MapEvent(Entity e) => new(
        EventId: e.Id.ToString(),
        Name: e.GetAttributeValue<string>(F_EvName) ?? string.Empty,
        Description: string.Empty,           // not on fcdo_event table
        StartDateTime: FormatDate(e.GetAttributeValue<DateTime>(F_EvStart)),
        EndDateTime: FormatDate(e.GetAttributeValue<DateTime>(F_EvEnd)),
        LocationType: string.Empty,           // not on fcdo_event table
        LocationName: string.Empty,           // not on fcdo_event table
        LocationAddress: string.Empty,        // not on fcdo_event table
        VirtualJoinUrl: string.Empty,         // not on fcdo_event table
        OrganiserName: string.Empty,          // not on fcdo_event table
        RsvpDeadline: FormatDate(e.GetAttributeValue<DateTime>(F_EvDeadline)),
        EventStatus: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_EvStatus), EventStatusMap),
        Capacity: e.GetAttributeValue<int>(F_EvCapacity),
        WaitlistEnabled: e.GetAttributeValue<bool>(F_EvWaitlist),
        QrCodeEnabled: e.GetAttributeValue<bool>(F_EvQrCode),
        EditRsvpAllowed: e.GetAttributeValue<bool>(F_EvEditAllowed),
        DietaryRequirementsEnabled: e.GetAttributeValue<bool>(F_EvDietary),
        AccessibilityRequirementsEnabled: e.GetAttributeValue<bool>(F_EvAccessibility),
        ApprovalRequired: e.GetAttributeValue<bool>(F_EvApproval)
    );

    private static GdsInvitation MapInvitation(Entity e, string? currentResponseId) => new(
        InvitationId: e.Id.ToString(),
        EventId: e.GetAttributeValue<EntityReference>(F_InvEventLookup)?.Id.ToString() ?? string.Empty,
        ContactId: e.GetAttributeValue<EntityReference>(F_InvContactLookup)?.Id.ToString() ?? string.Empty,
        InviteToken: e.GetAttributeValue<string>(F_InvToken) ?? string.Empty,
        InviteStatus: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_InvStatus), InviteStatusMap),
        MaxGuestsAllowed: e.GetAttributeValue<int>(F_InvMaxGuests),
        GuestEmailRequired: e.GetAttributeValue<bool>(F_InvGuestEmailRequired),
        NamedInviteOnly: e.GetAttributeValue<bool>(F_InvNamedOnly),
        AllowInviteeToEditContactDetails: e.GetAttributeValue<bool>(F_InvAllowEditContact),
        CurrentResponseId: currentResponseId
    );

    private static RsvpResponseDto MapResponse(Entity e) => new(
        ResponseId: e.Id.ToString(),
        InvitationId: e.GetAttributeValue<EntityReference>(F_RespInvitation)?.Id.ToString() ?? string.Empty,
        AttendanceStatus: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_RespStatus), AttendanceStatusMap),
        SubmittedOn: e.Contains(F_RespSubmitted) ? FormatDate(e.GetAttributeValue<DateTime>(F_RespSubmitted)) : null,
        DeclinedReason: e.GetAttributeValue<string>(F_RespDeclined) ?? string.Empty,
        CanEdit: e.GetAttributeValue<bool>(F_RespCanEdit),
        CheckedIn: e.GetAttributeValue<bool>(F_RespCheckedIn)
    );

    private static RsvpResponseDto EmptyResponse(string invitationId) => new(
        ResponseId: Guid.Empty.ToString(),
        InvitationId: invitationId,
        AttendanceStatus: "notStarted",
        SubmittedOn: null,
        DeclinedReason: string.Empty,
        CanEdit: true,
        CheckedIn: false
    );

    private static AttendeeDto MapAttendee(Entity e) => new(
        AttendeeId: e.Id.ToString(),
        AttendeeType: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_AttType), AttendeeTypeMap),
        FirstName: e.GetAttributeValue<string>(F_AttFirstName) ?? string.Empty,
        LastName: e.GetAttributeValue<string>(F_AttLastName) ?? string.Empty,
        Email: e.GetAttributeValue<string>(F_AttEmail) ?? string.Empty,
        DietaryRequirement: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_AttDietary), DietaryRequirementMap),
        DietaryRequirementOther: e.GetAttributeValue<string>(F_AttDietaryOther) ?? string.Empty,
        AccessibilityRequirement: e.GetAttributeValue<string>(F_AttAccessibility) ?? string.Empty,
        AccessibilityRequirementOther: e.GetAttributeValue<string>(F_AttAccessibilityOther) ?? string.Empty,
        QrCodeValue: e.GetAttributeValue<string>(F_AttQrCode) ?? string.Empty,
        CheckedIn: e.GetAttributeValue<bool>(F_AttCheckedIn)
    );

    private static EventQuestion MapQuestion(Entity e) => new(
        QuestionId: e.Id.ToString(),
        QuestionText: e.GetAttributeValue<string>(F_QText) ?? string.Empty,
        HelpText: e.GetAttributeValue<string>(F_QHelp) ?? string.Empty,
        QuestionType: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_QType), QuestionTypeMap),
        Required: e.GetAttributeValue<bool>(F_QRequired),
        DisplayOrder: e.GetAttributeValue<int>(F_QOrder),
        AppliesTo: MapOptionSetToString(e.GetAttributeValue<OptionSetValue>(F_QAppliesTo), AppliesToMap),
        Options: ParseOptions(e.GetAttributeValue<string>(F_QOptions)),
        ConditionalVisibilityRule: null
    );

    private static QuestionAnswer MapAnswer(Entity e) => new(
        AnswerId: e.Id.ToString(),
        QuestionId: e.GetAttributeValue<EntityReference>(F_AQuestion)?.Id.ToString() ?? string.Empty,
        ResponseId: e.GetAttributeValue<EntityReference>(F_AResponse)?.Id.ToString() ?? string.Empty,
        AttendeeId: e.GetAttributeValue<EntityReference>(F_AAttendee)?.Id.ToString(),
        Value: e.GetAttributeValue<string>(F_AValue) ?? string.Empty
    );

    private static string FormatDate(DateTime dt) =>
        dt == DateTime.MinValue ? string.Empty : dt.ToString("o");

    private static string MapOptionSetToString(OptionSetValue? v, Dictionary<int, string> map) =>
        v is null ? string.Empty : map.TryGetValue(v.Value, out var s) ? s : v.Value.ToString();

    private static List<string> ParseOptions(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return [];
        return raw.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
    }

    private static int MapAttendanceStatusToOptionSet(string status) => status switch
    {
        "notStarted"     => 919440000,
        "inProgress"     => 919440001,
        "attending"      => 919440002,
        "declined"       => 919440003,
        "maybe"          => 919440004,
        "waitlisted"     => 919440005,
        "pendingApproval" => 919440006,
        "approved"       => 919440007,
        "rejected"       => 919440008,
        _                => 919440000
    };

    private static int MapAttendeeTypeToOptionSet(string type) => type switch
    {
        "primary" => 919440000,
        "guest"   => 919440001,
        _         => 919440000
    };

    private static int MapDietaryToOptionSet(string dietary) => dietary switch
    {
        "none"        => 919440000,
        "vegetarian"  => 919440001,
        "vegan"       => 919440002,
        "halal"       => 919440003,
        "kosher"      => 919440004,
        "allergy"     => 919440005,
        "other"       => 919440006,
        _             => 919440000
    };

    // ── Option set value maps (verified against Dataverse metadata 2026-06-20) ──
    // LocationTypeMap removed — fcdo_locationtype does not exist on fcdo_event.

    private static readonly Dictionary<int, string> EventStatusMap = new()
    {
        { 919440000, "draft" }, { 919440001, "open" }, { 919440002, "closed" },
        { 919440003, "full" }, { 919440004, "cancelled" }, { 919440005, "complete" }
    };

    private static readonly Dictionary<int, string> InviteStatusMap = new()
    {
        { 919440000, "draft" }, { 919440001, "ready" }, { 919440002, "sent" },
        { 919440003, "opened" }, { 919440004, "responded" }, { 919440005, "expired" },
        { 919440006, "cancelled" }
    };

    private static readonly Dictionary<int, string> AttendanceStatusMap = new()
    {
        { 919440000, "notStarted" }, { 919440001, "inProgress" }, { 919440002, "attending" },
        { 919440003, "declined" }, { 919440004, "maybe" }, { 919440005, "waitlisted" },
        { 919440006, "pendingApproval" }, { 919440007, "approved" }, { 919440008, "rejected" }
    };

    private static readonly Dictionary<int, string> AttendeeTypeMap = new()
    {
        { 919440000, "primary" }, { 919440001, "guest" }
    };

    private static readonly Dictionary<int, string> QuestionTypeMap = new()
    {
        { 919440000, "text" }, { 919440001, "textarea" }, { 919440002, "yesNo" },
        { 919440003, "radio" }, { 919440004, "select" }, { 919440005, "multiSelect" },
        { 919440006, "checkbox" }
    };

    private static readonly Dictionary<int, string> AppliesToMap = new()
    {
        { 919440000, "rsvp" }, { 919440001, "primaryAttendee" }, { 919440002, "allAttendees" },
        { 919440003, "guestsOnly" }
    };

    private static readonly Dictionary<int, string> DietaryRequirementMap = new()
    {
        { 919440000, "none" }, { 919440001, "vegetarian" }, { 919440002, "vegan" },
        { 919440003, "halal" }, { 919440004, "kosher" }, { 919440005, "allergy" },
        { 919440006, "other" }
    };
}
