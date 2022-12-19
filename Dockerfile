#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["CsGoPostitive/CsGoPostitive.csproj", "CsGoPostitive/"]
COPY ["CsGoPositive.Bussines.Domain/CsGoPositive.Bussines.Domain.csproj", "CsGoPositive.Bussines.Domain/"]
COPY ["CsGoPositive.Data/CsGoPositive.Data.SqlServer.csproj", "CsGoPositive.Data/"]
COPY ["CsGoPositive.Bussines.Services/CsGoPositive.Bussines.Services.csproj", "CsGoPositive.Bussines.Services/"]
COPY ["CsGoPositive.Data.Access/CsGoPositive.Data.Access.csproj", "CsGoPositive.Data.Access/"]
COPY ["CsGoPositive.Security/CsGoPositive.Security.csproj", "CsGoPositive.Security/"]
RUN dotnet restore "CsGoPostitive/CsGoPostitive.csproj"
COPY . .
WORKDIR "/src/CsGoPostitive"
RUN dotnet build "CsGoPostitive.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CsGoPostitive.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CsGoPostitive.dll"]