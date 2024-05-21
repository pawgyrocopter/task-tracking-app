FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /app
COPY ["TaskTrackingAPI/TaskTrackingAPI.csproj", "TaskTrackingAPI/"]
COPY ["TaskTrackingDB/TaskTrackingDB.csproj", "TaskTrackingDB/"]
RUN dotnet restore "TaskTrackingAPI/TaskTrackingAPI.csproj"
COPY . .
WORKDIR "/app/TaskTrackingAPI"
RUN dotnet build "TaskTrackingAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM base AS final
COPY . /app
WORKDIR /app
ENTRYPOINT ["dotnet", "TaskTrackingAPI.dll"]
