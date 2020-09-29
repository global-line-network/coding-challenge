
<p align="center">
  <img src="https://globalline.my/static/logo.png" width="200">
</p>

##Coding-challenge 

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

Requirement :

* JDK 11
* Maven 3.6

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





  
