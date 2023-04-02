const http=require('http')
const  fs=require('fs')
var requests=require("requests")
const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
 temperature=temperature .replace("{%tempmin%}",orgVal.main.temp_min);
 temperature=temperature .replace("{%location%}",orgVal.name);
 temperature=temperature .replace("{%country%}",orgVal.sys.country);
 temperature=temperature .replace("{%tempmax%}",orgVal.main.temp_max);
 temperature=temperature .replace("{%tempstatus%}",orgVal.weather[0].main);
return temperature;

}

const homeFile=fs.readFileSync("home.html","utf-8")

const server =http.createServer((req,res)=>{
    if(req.url=="/")
    {

       requests('http://api.openweathermap.org/data/2.5/weather?q=Ratlam&appid=2334ba0a5599a729fb0e842e9df89ec2',)
.on('data', (chunk)=> {
    const data=JSON.parse(chunk)
    const arr=[data]
 
const realTimeData=arr.map((val)=>
    replaceVal(homeFile,val)).join("")
  
    res.write(realTimeData)
 

})
.on('end', (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
res.end();
});


    }

})

server.listen(8000,'127.0.0.1')