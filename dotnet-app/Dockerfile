# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and restore
COPY dotnet-redis-app.csproj ./
RUN dotnet restore "dotnet-redis-app.csproj"

# copy source and publish
COPY . .
RUN dotnet publish "dotnet-redis-app.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# copy published output
COPY --from=build /app/publish .

# set env vars
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV DOTNET_RUNNING_IN_CONTAINER=true

# expose app port
EXPOSE 8000

# run the app
ENTRYPOINT ["dotnet", "dotnet-redis-app.dll"]
