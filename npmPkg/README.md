# Renato-Fernandes-GSoC2019

## Proposal

Javascript library to acquire and display data from sensors

![GitHub repo size](https://img.shields.io/github/repo-size/RenatoFernandesTotti/Renato-Fernandes-GSoC2019.svg?style=flat-square&logo=GitHub) ![npm](https://img.shields.io/npm/dt/liquidsensors.svg?style=flat-square&logo=NPM) ![npm](https://img.shields.io/npm/v/liquidsensors.svg?style=flat-square)

### Current Public Methods

Obs: All of the methods return promises

#### createConnection

This method will create a new connection with a **MySql** instance.
It will create defaults tables if none is found

```javascript
createConnection = async ({
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
})
```

#### editSensor

Given a sensor name the library will update anything that is passed after that

```javascript
editSensor = (name, info = {
    name: "",
    description: "",
    ip: "",
    unit: "",
    lon: "",
    lat: ""
}
```

#### <span style="color:red">generateKml</span>

*to be implememted*

```javascript
generateKml = ()
```

#### getAllSensors

This method do not recieve any parameters and returns all of the sensors registered

````javascipt
getAllSensors = ()
````

#### getInfo

Returns all information about a registered sensor by its name

```javascript
getInfo = (name)
```

#### getSensorPosition

Returns the latitude and longitude of the sensor found by its name

````javascript
getSensorPosition = (name)
````

#### getUser

Returns everything about a user, Name,Email and the hashed password. you can provide ethier the name, email or databaseID for this method

````javascript
getUser = (param)
````

#### readSensor

Returns an array with wall lines from the readings table. Every element contains "sensorID, unit, value, date"

````javascript
readSensor = (name)
````

#### registerRead

Register a new value for the sensor by its name.

*Decimal:* tells the library where the floating point is. Some sensors vendos make the information coming out of the board a whole number without decimals. So if you have a number like this "123456789" and you want "12345.6789", just pass 4 into the decimal parameter.

*hex:* if true, the library will try to convert de value from hexadecimal to decimal. <span style="color:red">It needs to be a number after conversion</span>

````javascript
registerRead = (name, value, decimal, hex = false)
````

#### registerSensor

Register a sensor for a given user name,the username will set the owner of the sensor.
If no information is passed after the username in the function call everything will default for the values below.
**obs:** imgId is to identify a image by id in the aforementioned front-end app

```javascript
registerSensor = (username,{
    name= "Default sensor n: ",
    description= "Default description",
    unit= "To be set",
    lat= 0,
    lon= 0,
    imgId= 1,
} = {})
```

#### registerUser

Given a user name, password and email this method will store everything in the database.
**obs:** The password will be hashed using *sha512*

```javascript
registerUser = ({
    userName=null,
    userPass=null,
    userMail=null
}={})
```

#### startDemo

Starts generating mock data for the database.

*Sensor Number:* How many mock sensor the user wants to create

*user:* which user wants to start a demo

````javascript
startDemo = (sensorNumber,user, interval = 10)
````

#### stopDemo

Stops demo from StartDemo method, will delete mock sensors as well

````javascript
stopDemo = ()
````
