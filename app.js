const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const download = require('./download.js')
const app = express();
const cors = require('cors');
const path = require('path');
 
app.use(cors({
    exposedHeaders : ['X-Filename']
}));
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
    const relativePath = await download.downloadMP3(req.query.url);
    const truePath = path.resolve(`${dirMP3}/${relativePath}`);
    res.setHeader('Content-Type', 'audio/mpeg');     
    res.setHeader('X-Filename' , relativePath);

    res.sendFile(truePath , (err) => {
        if (err) {
        console.error("Gagal kirim file:", err);
        res.status(500).send("Gagal mengirim file");
      } else {
        fs.unlink(truePath,(err)=> {
            if(err){console.log(`error ${err}`);}
        })
      }
    });
});

app.get('/highestmp4', async(req, res) => {

    const relativePath = await download.downloadMP4Highest(req.query.url);
    const truePath = path.resolve(`${dirMP4}/${relativePath}`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('X-Filename' , relativePath);

    res.sendFile(truePath , (err) => {
        if (err) {
        console.error("Gagal kirim file:", err);
        res.status(500).send("Gagal mengirim file");
      } else {
        fs.unlink(truePath,(err)=> {
            if(err){console.log(`error ${err}`);}
        })
      }
    });
    
});

