const ffmpeg = require('ffmpeg');
const fs = require('fs');

// function convertMP3(dir){
//   try {
//     // const dir = 'public/output/mp3/LIQUID';
//     var process = new ffmpeg(`${dir}.webm`);
//     process.then((audio) => {
//       audio.fnExtractSoundToMP3(`${dir}.mp3`,(err, file) => {
//           if(err){
//             console.log(err);
//           }else{
//             fs.unlink(`${dir}.webm` , (err) => {
//               if(err){
//                 console.log(err);
//               }else{
//                 console.log("Selesai Di Konversi");
//               }
//             })
//           }
//       })
//     } ,(err) => {
//       if(err){
//         console.log(err);}
//     })
// } catch (e) {
//    console.error('❌ Exception:', e.code, e.msg);
// }
// }

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

// convertMP3("");

module.exports = {
  convertMP3
};
