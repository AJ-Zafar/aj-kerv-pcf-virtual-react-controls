using System.Text.RegularExpressions;

namespace LiveGdsRsvp.FunctionApp.Helpers;

public static class TokenValidator
{
    // 32-char base-62 alphanumeric token (our chosen format)
    // We accept 8–64 chars to be tolerant of legacy or future tokens
    private static readonly Regex ValidPattern = new(@"^[a-zA-Z0-9]{8,64}$", RegexOptions.Compiled);

    public static bool IsValid(string? token)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;
        return ValidPattern.IsMatch(token);
    }
}
