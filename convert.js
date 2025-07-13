const ffmpeg = require('ffmpeg');
const fluent_ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');



function convertMP3(dir) {
  return new Promise((resolve, reject) => {
    try {
      const process = new ffmpeg(`${dir}.webm`);
      process.then(
        audio => {
          audio.fnExtractSoundToMP3(`${dir}.mp3`, (err, file) => {
            if (err) return reject(err);

            fs.unlink(`${dir}.webm`, (err) => {
              if (err) return reject(err);
              console.log('✅ Konversi MP3 selesai dan WebM dihapus');
              resolve(file);
            });
          });
        },
        err => reject(err)
      );
    } catch (e) {
      reject(e);
    }
  });
}

function mergeVA(dir){
  return new Promise((resolve, reject) => {
    try {
        const video = `${dir}.mp4`;
        const audio = `${dir}.mp4a`;
        const output = `${dir}_merged.mp4`
        
        const process = new fluent_ffmpeg();
        process.input(video);
        process.input(audio);
        process.outputOptions('-c:v copy');
        process.outputOptions('-c:v copy');
        process.output(output);
       
        process.on('end' , () => {
          fs.unlink(audio, (err) => {
              if (err) return reject(err);
            });

            fs.unlink(video, (err) => {
              if (err) return reject(err);
            });

          console.log("Sukses Digabung!");
          resolve(output);
        
        });

        

        process.on("error",(err)=> {
          reject(err);
        })

        process.run();
    } catch (e) {
      reject(e);
    }
  });
}

// mergeVA('public/output/mp4/Kingdom_Hearts_HD_2.5_ReMIX_-_Birth_By_Sleep_Opening_Cinematic_@_1080p_HD_✔');

module.exports = {
  convertMP3,mergeVA
};
