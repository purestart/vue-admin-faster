var path=require('path');
var fs = require("fs");

var AsyncFs={
    makeDir(path){
        return new Promise((resolve, reject) => {
            fs.mkdir(path,function(err){
              if (err) {
                  console.error(err);
                  reject(err);
              }
              resolve();
          });
        })
        
      },
      makeDirs(dirpath){
        return new Promise((resolve, reject) => {
            fs.exists(dirpath, function(exists) {
                if(exists) {
                    resolve();
                }else{
                        //尝试创建父目录，然后再创建当前目录
                      AsyncFs.makeDirs(path.dirname(dirpath)).then((result) => {
                        fs.mkdir(dirpath,function(err) {
                            if (err) {
                                console.error(err);
                                
                                reject(err);
                            }
                            resolve();
                        });
                    }).catch((err) => {
                        console.error(err);
                        reject(err);
                    });
                }
            })
        })
    
      },
      writeFile(filePath,content){
          return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content,function(err) {
                if(err){
                    reject(err);
                }
                resolve();
            });
          }) 
      }
}
module.exports=AsyncFs;