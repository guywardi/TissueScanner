
# TissueScanner

##backend connection
in app.js file replace config.DBPath with wanted mongoDB path:
`var  db = mongoose.connect(config.DBPath);` <br/>
set supersecret to whatever string:
`app.set('superSecret', config.secret);`


## Installation
<ol>
<li>clone repo</li>
<li>run npm install</li>
<li>create new file: config.json.</li>
<li>set a secret key and your database server is running path with the museum</li>
</ol>


```
{
"secret":"allOfUsAreOne",
"DBPath": "mongodb://username:user@someKey.mongolab.com:someOtherKey/museo"
}
```
5.from terminal > gulp to run application.

## Usage



###routes

#### Auth

POST  `localhost:8000/api/authenticate` with valid username and password from users collection.
*if project is initialized user should be inserted manually to database

HTTP respone
 ```
{
  "success": true,
  "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9... SOME LONG TOKEN ........"
}
```
return Authorization token. required for all route besides GET `http://localhost:8000/api/Exhibits/`

####HTTP.GET <br />

`http://localhost:8000/api/users/`

return a list of users

####HTTP.POST <br />

`http://localhost:8000/api/users/`

req:
 ```
{
    "username":"asa",
    "password":"paske"
}
 ```
 res:
  ```
{
  "message": "New User -Admin room!"
}
 ```
saves a user to database
