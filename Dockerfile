FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt install nodejs

# copy csproj and restore as distinct layers
COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "IZGWeb.dll"]