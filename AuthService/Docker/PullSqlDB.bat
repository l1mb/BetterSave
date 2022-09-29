docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Pa$$w0rd" -p 14330:1433 --name AuthDB  -d mcr.microsoft.com/mssql/server:2022-latest


   //docker exec -it AuthDB /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Pa$$w0rd" -Q "ALTER LOGIN SA WITH PASSWORD='11'"