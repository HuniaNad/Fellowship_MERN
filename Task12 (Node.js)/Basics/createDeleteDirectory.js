const fs = require('fs');
const path = require('path')

if(!fs.existsSync(path.join(__dirname, 'files','newDir'))){
    fs.mkdir(path.join(__dirname, 'files','newDir'), (err) => {
        if (err) throw err;
        console.log('Directory created!')
    })
}
else{
    console.log('Directory already exists!')
}

if(fs.existsSync(path.join(__dirname, 'files','newDir'))){
    fs.rmdir(path.join(__dirname, 'files','newDir'), (err) => {
        if (err) throw err;
        console.log('Directory removed!')
    })
}
else{
    console.log('Directory does not exist!')
}