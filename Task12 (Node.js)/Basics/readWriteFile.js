/* 

    WITH PROMISES

*/
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try{
        /*
        starter.txt: Hellow World
        */
        const data = await fsPromises.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8')
        console.log(data)

        //delete file
        // await fsPromises.unlink(path.join(__dirname, 'files','starter.txt'))


        await fsPromises.writeFile(path.join(__dirname, 'files','reply.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files','reply.txt'), "!!")
        await fsPromises.rename(path.join(__dirname, 'files','reply.txt'),path.join(__dirname, 'files','promiseReply.txt'))

        const newData = await fsPromises.readFile(path.join(__dirname, 'files','promiseReply.txt'), 'utf8')
        console.log(newData)

    }
    catch (err){
        console.log(err)

    }
}

fileOps()




/* 

        WITHOUT PROMISES 

*/
// const fs = require('fs');
// const path = require('path');
// fs.readFile(path.join(__dirname, 'files','reply.txt'), 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log("Reading data:", data);
// })

// fs.writeFile(path.join(__dirname, 'files','reply.txt'), 'Hellow', (err) => {
//     if(err) throw err;
//     console.log('Write complete');

//     fs.appendFile(path.join(__dirname, 'files','reply.txt'), ' Worldd d', (err) => {
//         if(err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files','reply.txt'), path.join(__dirname, 'files','newReply.txt'), (err) => {
//             if(err) throw err;
//             console.log('Rename complete');

//             fs.readFile(path.join(__dirname, 'files','newReply.txt'), 'utf8', (err, data) => {
//                 if(err) throw err;
//                 console.log("Reading data:", data);
//             })
//         })
//     })
// })

// console.log("I'm outside text")

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`)
    process.exit()
})