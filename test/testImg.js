const fs = require("fs");
const path = require("path");

fs.promises.rename(
    "/Users/iVnalAGreen/Desktop/FrontEndRoad/expressWorkspace/myServer/public/imgs/9b0a16babede2d846691d5a4fc834dc9",
    "/Users/iVnalAGreen/Desktop/FrontEndRoad/expressWorkspace/myServer/public/imgs/9b0a16babede2d846691d5a4fc834dc9.jpg"
).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});
