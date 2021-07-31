const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){ 
    res.sendFile(__dirname+"/index.html");   
})

app.post('/results',function(req,res){
    const cityName= req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=1fcb64c2b40342ee5227b57ac22ea349";

    https.get(url,function(response){
        
        response.on("data",function(data){
            const weather = JSON.parse(data);
            const weatherDescription = weather.weather[0].description;
            const iconID = weather.weather[0].icon;
            const iconURL ="http://openweathermap.org/img/wn/"+iconID+"@2x.png";
            const temp = weather.main.temp;
            res.set("Content-Type", "text/html");
            res.write("<h1> The weather in "+cityName+" is "+weatherDescription+"</h1>"); 
            res.write(" <h1>The temperature is "+temp+" degree celcius</h1>");  
            res.write("<img src="+iconURL+">");  
            res.send();      
        })
      
    })
})














app.listen(3030);
























//Api key - 1fcb64c2b40342ee5227b57ac22ea349
//API KEY - 1fcb64c2b40342ee5227b57ac22ea349