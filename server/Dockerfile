FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TaskTrackingAPI/TaskTrackingAPI.csproj", "TaskTrackingAPI/"]
COPY ["TaskTrackingDB/TaskTrackingDB.csproj", "TaskTrackingDB/"]
RUN dotnet restore "TaskTrackingAPI/TaskTrackingAPI.csproj"
COPY . .
WORKDIR "/src/TaskTrackingAPI"
RUN dotnet build "TaskTrackingAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TaskTrackingAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskTrackingAPI.dll"]
