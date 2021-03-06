# Renato-Fernandes-GSoC2019

## Proposal

Javascript library to acquire and display data from sensors

![GitHub repo size](https://img.shields.io/github/repo-size/RenatoFernandesTotti/Renato-Fernandes-GSoC2019.svg?style=flat-square&logo=GitHub) ![npm](https://img.shields.io/npm/dt/liquidsensors.svg?style=flat-square&logo=NPM) ![npm](https://img.shields.io/npm/v/liquidsensors.svg?style=flat-square)

### Current Public Methods

Obs: All of the methods return promises

#### createConnection(Object)

This method will create a new connection with a **Postgre** instance.
It will create defaults tables if none is found

```javascript
createConnection({
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
})
```

#### deleteSensor

Delete a sensor by its name

````javascript
deleteSensor(name)
````

#### editSensor

Given a sensor name the library will update a sensor information given what is passed in the `info` object

```javascript
editSensor(name, info = {
    name: "",
    description: "",
    ip: "",
    unit: "",
    lon: "",
    lat: "",
    img: "",
    unitdesc: ""
})
```

#### getAllSensors

This method do not recieve any parameters and returns all of sensors name with the owner and icon url

```javascript
getAllSensors()
```

#### getFullSensors

This method returns everything about a sensors and its owner but he email and hashed password

````javascript
getFullSensors()
````

#### getInfo

Returns all information about a registered sensor by its name

```javascript
getInfo(name)
```

#### getSensorPosition

Returns the latitude and longitude of the sensor found by its name

````javascript
getSensorPosition(name)
````

#### getUser

Returns everything about a user, Name,Email and the hashed password. you can provide ethier the name, email or databaseID for this method

````javascript
getUser(param)
````

#### readSensor

Returns an array with wall lines from the readings table. Every element contains "sensorID, unit, value, date"

The `datespan` argument set a time span for the dabatase to compare. It can be one of the values below:

`1y` `6m` `1m` `1w` `1d`

Being as y=year m=month w=week d=day

````javascript
readSensor(name,datespan)
````

#### readUserSensors

Returns all of the user sensors by the user name

````javascript
readUserSensors(name)
````

#### registerRead

Register a new value for the sensor by its name.

*Decimal:* tells the library where the floating point is. Some sensors vendos make the information coming out of the board a whole number without decimals. So if you have a number like this "123456789" and you want "12345.6789", just pass 4 into the decimal parameter.

*hex:* if true, the library will try to convert de value from hexadecimal to decimal. <span style="color:red">It needs to be a number after conversion</span>

````javascript
registerRead(name, value, decimal, hex = false)
````

#### registerSensor

Register a sensor for a given user name,the username will set the owner of the sensor.
If no information is passed after the username in the function call everything will default for the values below.
**obs:** imgId is to identify a image by url in the aforementioned front-end app.

**obs2:** unitdes is a long version of the unit. For example:
`unit = Km/H`
`unitdesc = Kilometers per Hour`

```javascript
registerSensor(username,{
    name= "Default sensor n: ",
    description= "Default description",
    unit= "To be set",
    lat= 0,
    lon= 0,
    imgId= "",
    unitdesc = "To be set"
})
```

#### registerUser

Given a user name, password and email this method will store everything in the database.
**obs:** The password will be hashed using *sha512*

```javascript
registerUser = ({
    userName=null,
    userPass=null,
    userMail=null
})
```
>>>>>>> Stashed changes
