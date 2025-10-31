# -------------------------------
# BUILD STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy .csproj
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . .

RUN dotnet publish -c Release -o /app/out

# -------------------------------
# RUNTIME STAGE
# -------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/out ./

EXPOSE 5000
ENTRYPOINT ["sh", "-c", "dotnet BuddyGoals.dll --urls http://0.0.0.0:${PORT:-5000}"]
