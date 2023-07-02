# Astalavista
The best place app ever

To run server
> dotnet run

Before running, ensure you've updated db by command  
> dotnet ef database update

Don't forget to change connection string on yours in appsettings.json(if it is absent, ask me)

If the project can't compile, try
> dotnet restore

If you can't run ef commands do these command
> dotnet new tool-manifest  
> dotnet tool install dotnet-ef  

Existing api(input/output)  
-> http://localhost:5000/Auth/nativeRegister (POST)
  ```json
  {
     "Name":"Alex",
     "Surname": "Flex",
     "Mail": "sjhdjshdj@mail.com",
     "Password":"12345"
  }
  ```
  ```json
  {
     "userId":"1",
     "name":"Alex",
     "surname": "Flex",
     "mail": "sjhdjshdj@mail.com",
     "password":"12345"
  }
  ```
-> http://localhost:5000/Auth/nativeLogin (POST)
  ```json
  {
    "UserPassword":"12345",
    "UserMail":"sjhdjshdj@mail.com"
  }
  ```
  ```json
  {
     "userId":"1",
     "token":"login_token",
     "name":"Alex",
     "surname": "Flex"
  }
  ```
  
