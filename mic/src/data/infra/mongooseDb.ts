import mongoose from 'mongoose'

async function init (){
    const user = 'root';
    const pass = 'example';
    const database = 'admin';
    const serverName = 'mongodb';
    const port = 27017

    const options = {
        autoIndex: true, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };

    const uri = `mongodb://${user}:${pass}@${serverName}:${port}/${database}`
    console.log(uri);    

    mongoose
        .connect(uri, options)
        .then((res) => { console.log(`Connection Successful ${res}`) })
        .catch((err) => { console.log(`Error in DB connection: ${err}`) });
}

export default {
    init
}