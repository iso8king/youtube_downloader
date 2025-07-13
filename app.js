const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const download = require('./download.js')
const app = express();

 

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.listen(7888, () => {
    console.log('Server is running on http://localhost:7888');
})

const dirMP3 = "public/output/mp3";
const dirMP4 = "public/output/mp4";

app.get('/', async(req, res) => {
    
    const relativePath = await download.downloadMP4(req.query.url);
    res.status(500).send('Video is being downloaded. Please check the output folder.');
});

app.get('/mp3', async(req, res) => {
    // await mp4.downloadMP4(req.query.url);
    // await 
    // res.redirect(output)
    const relativePath = await download.downloadMP3(req.query.url);

   
    res.download(`${dirMP3}/${relativePath}`, (e) => {
        if(e){
            console.log(e);
            res.status(500).send("Gagal");
        }
    })

});

app.get('/highestmp4', async(req, res) => {
    // await mp4.downloadMP4(req.query.url);
    // await 
    // res.redirect(output)
    const relativePath = await download.downloadMP4Highest(req.query.url);

   
    res.download(`${relativePath}`, (e) => {
        if(e){
            console.log(e);
            res.status(500).send("Gagal");
        }
    })

});

