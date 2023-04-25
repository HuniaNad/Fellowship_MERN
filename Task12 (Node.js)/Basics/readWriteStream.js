const fs = require('fs');
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname, 'files','lorem.txt'), 'utf-8');

const ws = fs.createWriteStream(path.join(__dirname, 'files','newLorem1.txt'))

/* 
    On callback
*/
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

/* 
    Pipes (efficient)
*/
// rs.pipe(ws)

// rs.on('error', (err) => {
//     console.log(err)
// })