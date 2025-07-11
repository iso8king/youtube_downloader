const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const convert = require('./convert')
const { deepStrictEqual } = require('assert');
const { dir } = require('console');

// const url = 'https://www.youtube.com/watch?v=KsB99Sf_fX0'; 



async function downloadMP4(link) {
    try {
        let info = await ytdl.getInfo(link);
        let videoTitle = await info.videoDetails.title;
        console.log(`Downloading video: ${videoTitle}`);
        ytdl(link,{quality: 'highestvideo' , filter: 'audioandvideo'}).pipe(fs.createWriteStream(`public/output/mp4/${videoTitle}.mp4`)).on('finish', () => {
        console.log(`Video ${videoTitle} Di Download`);
       return output = "/output/mp4/" + videoTitle + ".mp4";
});

    } catch (error) {
        throw error;
    }
}

function downloadAudio(link, dirWebm) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(link, { quality: 'highestaudio', filter: 'audioonly' }).pipe(fs.createWriteStream(`${dirWebm}.webm`));
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

async function downloadMP3(linkMP3){
    try {
        
        let info = await ytdl.getInfo(linkMP3);
        let videoTitle = await info.videoDetails.title;
        const videoTitleSafe = videoTitle.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').replace(/\s+/g, '_');
        console.log(`Downloading audio: ${videoTitle}`);
        let dirWebm = `public/output/mp3/${videoTitleSafe}`;

        // const process = ytdl(linkMP3 , {quality : 'highestaudio' , filter : 'audio'}).pipe(fs.createWriteStream(`${dirWebm}.webm`));
        // process.then(() => {
        //       convert.convertMP3(dirWebm);
        // })
        await downloadAudio(linkMP3 , dirWebm);
        await convert.convertMP3(dirWebm);

        console.log(`Audio ${videoTitle} Selesai Di Download!`);
        return `${videoTitleSafe}.mp3`
}
 catch (error) {
        console.log(error);
    }
}

// downloadMP3('https://www.youtube.com/watch?v=ZdgQ82boywc&list=RDZdgQ82boywc&start_radio=1')
// downloadMP3('https://www.youtube.com/watch?v=SiJie3Z7DG8');

module.exports = {
  downloadMP4,
  downloadMP3
};