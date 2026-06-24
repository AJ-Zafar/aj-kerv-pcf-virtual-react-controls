using System.Text.Json.Serialization;

namespace LiveGdsRsvp.FunctionApp.Models;

// ── Enums ──

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum LocationType { Physical, Virtual, Hybrid }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EventStatus { Draft, Open, Closed, Full, Cancelled }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum InviteStatus { Sent, Opened, Responded, Expired }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AttendanceStatus { NotStarted, Attending, Declined, Waitlisted, PendingApproval }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AttendeeType { Primary, Guest }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum QuestionType { Text, Textarea, YesNo, Radio, Select, MultiSelect, Checkbox }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum QuestionAppliesTo { Rsvp, PrimaryAttendee, AllAttendees, GuestsOnly }

// ── Dataverse DTOs ──

public record GdsEvent(
    string EventId,
    string Name,
    string Description,
    string StartDateTime,
    string EndDateTime,
    string LocationType,
    string LocationName,
    string LocationAddress,
    string VirtualJoinUrl,
    string OrganiserName,
    string RsvpDeadline,
    string EventStatus,
    int Capacity,
    bool WaitlistEnabled,
    bool QrCodeEnabled,
    bool EditRsvpAllowed,
    bool DietaryRequirementsEnabled,
    bool AccessibilityRequirementsEnabled,
    bool ApprovalRequired
);

public record GdsInvitation(
    string InvitationId,
    string EventId,
    string ContactId,
    string InviteToken,
    string InviteStatus,
    int MaxGuestsAllowed,
    bool GuestEmailRequired,
    bool NamedInviteOnly,
    bool AllowInviteeToEditContactDetails,
    string? CurrentResponseId
);

public record RsvpResponseDto(
    string ResponseId,
    string InvitationId,
    string AttendanceStatus,
    string? SubmittedOn,
    string DeclinedReason,
    bool CanEdit,
    bool CheckedIn
);

public record AttendeeDto(
    string AttendeeId,
    string AttendeeType,
    string FirstName,
    string LastName,
    string Email,
    string DietaryRequirement,
    string DietaryRequirementOther,
    string AccessibilityRequirement,
    string AccessibilityRequirementOther,
    string QrCodeValue,
    bool CheckedIn
);

public record EventQuestion(
    string QuestionId,
    string QuestionText,
    string HelpText,
    string QuestionType,
    bool Required,
    int DisplayOrder,
    string AppliesTo,
    List<string> Options,
    string? ConditionalVisibilityRule
);

public record QuestionAnswer(
    string AnswerId,
    string QuestionId,
    string ResponseId,
    string? AttendeeId,
    string Value
);

// ── Top-level aggregate returned by GET /api/rsvp/{token} ──

public record ScenarioData(
    GdsEvent Event,
    GdsInvitation Invitation,
    RsvpResponseDto Response,
    List<AttendeeDto> Attendees,
    List<EventQuestion> Questions,
    List<QuestionAnswer> Answers
);

// ── Inbound submit request ──

public record AttendeeFormData(
    string AttendeeId,
    string AttendeeType,
    string FirstName,
    string LastName,
    string Email,
    string DietaryRequirement,
    string DietaryRequirementOther,
    string AccessibilityRequirement,
    string AccessibilityRequirementOther
);

public record SubmitRsvpRequest(
    string Token,
    string AttendanceStatus,
    string DeclinedReason,
    AttendeeFormData PrimaryAttendee,
    List<AttendeeFormData> Guests,
    Dictionary<string, string> QuestionAnswers
);

// ── Generic API error ──

public record ApiError(string Code, string Message);
