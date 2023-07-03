# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY ["./Attractionteka.Backend.csproj", "Attractionteka.Backend/"]

RUN dotnet restore Attractionteka.Backend/Attractionteka.Backend.csproj

COPY . ./Attractionteka.Backend

RUN dotnet publish Attractionteka.Backend/Attractionteka.Backend.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

EXPOSE 80

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Attractionteka.Backend.dll"]
