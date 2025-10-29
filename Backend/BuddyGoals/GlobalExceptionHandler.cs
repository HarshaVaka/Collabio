using BuddyGoals.Exceptions;

namespace BuddyGoals
{
    public class GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<GlobalExceptionHandler> _logger = logger;

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled Exception. Trace Id:{TraceId}", httpContext.TraceIdentifier);
                await HandleExceptionAsync(ex, httpContext);
            }
        }

        public async Task HandleExceptionAsync(Exception ex, HttpContext context)
        {
            context.Response.ContentType = "application/json";
            var traceId = context.TraceIdentifier;
            int statusCode = ex switch
            {
                ApiException apiEx => apiEx.StatusCode,
                _ => StatusCodes.Status500InternalServerError
            };

            var errorResponse = new
            {
                traceId,
                status = statusCode,
                error = ex.Message
            };
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}
