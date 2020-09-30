
<p align="center">
  <img src="https://globalline.my/static/logo.png" width="200">
</p>

##Coding-challenge 

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

Requirement :

* JDK 11
* Maven 3.6.2

This application using H2 as embedded DB so need initial registration/login, after that POST some user account and then 
enable for GET / UPDATE or DELETE endpoint .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
./mvnw quarkus:dev 
```

## List API 

* Register User Request 
```
curl --location --request POST 'http://localhost:8080/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ahmad.ramsey@gmail.com",
    "password": "test123"
}'
```
* Register Response 
```
{
    "token": "eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJHTE4tVGVjaCIsInN1YiI6ImFobWFkLnJhbXNleUBnbWFpbC5jb20iLCJpYXQiOjE2MDEzNzUwOTgsImV4cCI6MTYwMTM3ODY5OCwiZ3JvdXBzIjpbIlVzZXIiXSwianRpIjoidG1SaTUyZ2FndTNucnZFUnY1VmFLUSJ9.C-PIIZ3qXjqWAMqq5hxE2SvlRMzUoOFYT3eQzaf-he85wkZAsvnDBS7fm5qhD3go2lPH7kuUrHypTMpyn5kMUnE2FDx7joPT7hqjWzuxb0NlbEJRgNhZ_jfjtS0XdgS6-1IPo4Cm5-NRssJ-71HL6wjJmDvOiEZIp5PZSxtjzhfaZT4JRZhjj3gJsx-VRDcV8cdmarZmuMZfrVcru2dKz6mWEHjGJbpi9PTOfel8eE8yuwNc4HX_S4zBQ5oyfXWUE7D4YBWaq4Gsvbrs1Jt4TkoZZHei_FN3FAhh82gbD1SiOUHHEcLumrmokxwtZMMaZWtayKmU_rufiId08fBPmg",
    "id": 33
}
```
* Missing request param on Authentication endpoint will return
```
{
    "error": "Missing Password"
}
```

* Login 
```
curl --location --request POST 'http://localhost:8080/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ahmad.ramsey@gmail.com",
    "password": "test123"
}'
```  

* Login Response (token response needed for access UsersAccount Resource)
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJHTE4tVGVjaCIsInN1YiI6ImFobWFkLnJhbXNleUBnbWFpbC5jb20iLCJpYXQiOjE2MDE0NDU4MjYsImV4cCI6MTYwMTQ0OTQyNiwiZ3JvdXBzIjpbIlVzZXIiXSwianRpIjoiZkdrN3hvZFY1amNQRUxFeHptV1Y4dyJ9.KK7guNkITwDmRHn2o_p7Tc53Gt7ojJlf90owTcjXVTDLjkauky_ScQef0ErZy43uUjtH-yM--bE8OkbY4JPEd8okXz6L2W59mdo3YOhz-4EJ8ZrOa82mIIBLmdIQO9e17DQgtqT6WRY2i2SyXvFTJNUySpLoIzJLfDLJNoG8OmKxs5C3jyH1NmPBRKmwOOt4f-E13M8JPzXQVNwdHVBP64JWRxdhSsz6XjHGbXyD_CQ4E7x9VHI926P7TyBgHPcX04RuXskkfXj0VIo3Fn3kxFlgVy3QSMCjoH5PU25HPLxG1CWIj75DGcA6rqPnZWvkSA3Z57ny_V3dzKuxMvz7XA"
}
```

* Post UserAccount Request
```
curl --location --request POST 'http://localhost:8080/api/users' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJHTE4tVGVjaCIsInN1YiI6ImFobWFkLnJhbXNleUBnbWFpbC5jb20iLCJpYXQiOjE2MDE0NDU4MjYsImV4cCI6MTYwMTQ0OTQyNiwiZ3JvdXBzIjpbIlVzZXIiXSwianRpIjoiZkdrN3hvZFY1amNQRUxFeHptV1Y4dyJ9.KK7guNkITwDmRHn2o_p7Tc53Gt7ojJlf90owTcjXVTDLjkauky_ScQef0ErZy43uUjtH-yM--bE8OkbY4JPEd8okXz6L2W59mdo3YOhz-4EJ8ZrOa82mIIBLmdIQO9e17DQgtqT6WRY2i2SyXvFTJNUySpLoIzJLfDLJNoG8OmKxs5C3jyH1NmPBRKmwOOt4f-E13M8JPzXQVNwdHVBP64JWRxdhSsz6XjHGbXyD_CQ4E7x9VHI926P7TyBgHPcX04RuXskkfXj0VIo3Fn3kxFlgVy3QSMCjoH5PU25HPLxG1CWIj75DGcA6rqPnZWvkSA3Z57ny_V3dzKuxMvz7XA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "naima",
    "job": "QA"
}'
```

* Post UserAccount Response
```
{
    "createdDate": "2020-09-30T13:06:55.316377",
    "id": 196,
    "modifiedDate": "2020-09-30T13:06:55.316455",
    "job": "QA",
    "name": "naima"
}
```

* Get UserAccount By Id Request
```
curl --location --request GET 'http://localhost:8080/api/users/196' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJHTE4tVGVjaCIsInN1YiI6ImFobWFkLnJhbXNleUBnbWFpbC5jb20iLCJpYXQiOjE2MDE0NDU4MjYsImV4cCI6MTYwMTQ0OTQyNiwiZ3JvdXBzIjpbIlVzZXIiXSwianRpIjoiZkdrN3hvZFY1amNQRUxFeHptV1Y4dyJ9.KK7guNkITwDmRHn2o_p7Tc53Gt7ojJlf90owTcjXVTDLjkauky_ScQef0ErZy43uUjtH-yM--bE8OkbY4JPEd8okXz6L2W59mdo3YOhz-4EJ8ZrOa82mIIBLmdIQO9e17DQgtqT6WRY2i2SyXvFTJNUySpLoIzJLfDLJNoG8OmKxs5C3jyH1NmPBRKmwOOt4f-E13M8JPzXQVNwdHVBP64JWRxdhSsz6XjHGbXyD_CQ4E7x9VHI926P7TyBgHPcX04RuXskkfXj0VIo3Fn3kxFlgVy3QSMCjoH5PU25HPLxG1CWIj75DGcA6rqPnZWvkSA3Z57ny_V3dzKuxMvz7XA'
```

* Get User Account By Id Response
```
{
    "ad": {
        "company": "StatusCode Weekly",
        "text": "http://statuscode.org/",
        "url": "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things."
    },
    "data": {
        "createdDate": "2020-09-30T13:06:55.316377",
        "id": 196,
        "modifiedDate": "2020-09-30T13:06:55.316455",
        "job": "QA",
        "name": "naima"
    }
}
```

* Get All User Account Request
```
curl --location --request GET 'http://localhost:8080/api/users?pageNum=1&pageSize=4' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJHTE4tVGVjaCIsInN1YiI6ImFobWFkLnJhbXNleUBnbWFpbC5jb20iLCJpYXQiOjE2MDE0NDU4MjYsImV4cCI6MTYwMTQ0OTQyNiwiZ3JvdXBzIjpbIlVzZXIiXSwianRpIjoiZkdrN3hvZFY1amNQRUxFeHptV1Y4dyJ9.KK7guNkITwDmRHn2o_p7Tc53Gt7ojJlf90owTcjXVTDLjkauky_ScQef0ErZy43uUjtH-yM--bE8OkbY4JPEd8okXz6L2W59mdo3YOhz-4EJ8ZrOa82mIIBLmdIQO9e17DQgtqT6WRY2i2SyXvFTJNUySpLoIzJLfDLJNoG8OmKxs5C3jyH1NmPBRKmwOOt4f-E13M8JPzXQVNwdHVBP64JWRxdhSsz6XjHGbXyD_CQ4E7x9VHI926P7TyBgHPcX04RuXskkfXj0VIo3Fn3kxFlgVy3QSMCjoH5PU25HPLxG1CWIj75DGcA6rqPnZWvkSA3Z57ny_V3dzKuxMvz7XA'
```

* Get All User Account Response
```
{
    "ad": {
        "company": "StatusCode Weekly",
        "text": "http://statuscode.org/",
        "url": "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things."
    },
    "data": [
        {
            "createdDate": "2020-09-30T11:56:49.626073",
            "id": 163,
            "modifiedDate": "2020-09-30T11:56:49.626273",
            "job": "QA",
            "name": "mima"
        },
        {
            "createdDate": "2020-09-30T12:00:15.202249",
            "id": 164,
            "modifiedDate": "2020-09-30T12:00:15.202306",
            "job": "accounting",
            "name": "niet"
        },
        {
            "createdDate": "2020-09-30T13:06:55.316377",
            "id": 196,
            "modifiedDate": "2020-09-30T13:06:55.316455",
            "job": "QA",
            "name": "naima"
        }
    ],
    "page": 1,
    "per_page": 4,
    "total": 3,
    "total_pages": 0
}
```

## Packaging and running the application

The application can be packaged using `./mvnw package`.
It produces the `coding-challenge-1.0-SNAPSHOT-runner.jar` file in the `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/coding-challenge-1.0-SNAPSHOT-runner.jar`.

## Creating a native executable

You can create a native executable using: `./mvnw package -Pnative`.

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: `./mvnw package -Pnative -Dquarkus.native.container-build=true`.

You can then execute your native executable with: `./target/coding-challenge-1.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/building-native-image.


Contribute by [mohd.rully.k@gmail.com](mailto:mohd.rully.k@gmail.com).  





  
