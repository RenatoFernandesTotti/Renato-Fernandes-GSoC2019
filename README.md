# Renato-Fernandes-GSoC2019

![GitHub repo size](https://img.shields.io/github/repo-size/RenatoFernandesTotti/Renato-Fernandes-GSoC2019.svg?style=flat-square&logo=GitHub) ![npm](https://img.shields.io/npm/dt/liquidsensors.svg?style=flat-square&logo=NPM) ![npm](https://img.shields.io/npm/v/liquidsensors.svg?style=flat-square)


## Proposal

Javascript library to acquire and display data from sensors

Here you can find how to operate the **server** methods, to see the library methods see [this page](https://www.npmjs.com/package/liquidsensors)

----
This repo contains two main folders:

**Server**
This folder contains a default implementation of the main library, containing a node server ready to go. It includes as well a pre-compiled version of the front end.
It implements a lot of premade code for your application.
Also, a frontend app is being developed for this particular implementation [here](https://github.com/RenatoFernandesTotti/Renato-Fernandes-GSoC2019-FrontEndApp)
Below this section you can find a documentation on how to setup and use this server.

**npmPkg**
Here you can find all of the library code.

If oy want to see the library docs just click [here](https://www.npmjs.com/package/liquidsensors)

----

## Server setup

### Base setup

You will need a conection with a postgre database, just create a new file inside de `server` folder with the name `keys.js`.

the keys.js file needs to contain your credentials to the database. The two tested file format are listed below

```javascript
var k={
    connectionString: '{Your string}',
    ssl: true, 
}

module.exports = k
```

or

```javascript
var k={
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
}

module.exports = k
```

Remenber to always export the keys with `module.exports`

### Liquid galaxy setup

Inside the [frontend repo][frontend] you will find a file named .env.production
Inside said file you will find the following content:

```env
VUE_APP_backEnd=
VUE_APP_ericbe=http://192.168.0.155:8888
VUE_APP_masterIp=192.168.0.155
VUE_APP_slaveIp=192.168.0.141
VUE_APP_key=123456
VUE_APP_user=user
VUE_APP_localip=http://192.168.0.187:8888
```

Just change the ip for each line following this list

#### VUE_APP_backEnd

Where this server is running, if you run directly from this server just leave empty.

#### VUE_APP_ericbe

The ip to the kmlwriter, developed by eric [here][eric repo]
This NEEDS to have the following syntax
`http://{ip}:{port}`
just as seen above in the example

#### VUE_APP_masterIp

The ip to the master node from a liquid galaxy installation

#### VUE_APP_slaveIp

The ip to the leftmost node in a liquidgalaxy installation

#### VUE_APP_key

The password for the computers inside a liquid galaxy installation

#### VUE_APP_user

The user name for the pcs inside a liquid galaxy installation

#### VUE_APP_localip

The ip from the machine where this serve is going to run.
**This also needs the same syntax as the ericbe variable**

After setting up all of the variables just compile de site with `npm run build` inside the frontend folder and copy the `dist` file to the `server` file in here.

----

## Running the server

After setting up everything, go inside the server folder and run `npm run dev` to start the server

The web application will be available in the 8888 port by default

[eric repo]:(https://github.com/xemyst/liquid-galaxy-kml-uploader)

[frontend]:(https://github.com/RenatoFernandesTotti/Renato-Fernandes-GSoC2019-FrontEndApp)
>>>>>>> Stashed changes
