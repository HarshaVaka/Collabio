# -------------------------------
# BUILD STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the csproj first (better caching)
COPY Backend/BuddyGoals/*.csproj ./BuddyGoals/
RUN dotnet restore ./BuddyGoals/BuddyGoals.csproj

# Copy the rest of the source
COPY Backend/BuddyGoals/. ./BuddyGoals/

# Publish the app
WORKDIR /src/BuddyGoals
RUN dotnet publish -c Release -o /app/out

# -------------------------------
# RUNTIME STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published output
COPY --from=build /app/out ./

# Expose internal port
EXPOSE 5000

# Run with dynamic port from Render
ENTRYPOINT ["sh", "-c", "dotnet BuddyGoals.dll --urls http://0.0.0.0:${PORT:-5000}"]
