# -------------------------------
# BUILD STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY BuddyGoals/*.csproj ./BuddyGoals/
RUN dotnet restore ./BuddyGoals/BuddyGoals.csproj

# Copy everything else and build
COPY . .
WORKDIR /src/BuddyGoals
RUN dotnet publish -c Release -o /app/out

# -------------------------------
# RUNTIME STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Render passes PORT dynamically (e.g. 10000)
ENV ASPNETCORE_URLS=http://+:${PORT:-5000}

ENTRYPOINT ["dotnet", "BuddyGoals.dll"]
