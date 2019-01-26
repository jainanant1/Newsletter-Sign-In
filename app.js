//jshint esversion :6
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;
  var data={
    members:[
      {
        email_address: email,
        status: "subscribed",
      }
    ]
  };

  var jsonData=JSON.stringify(data);
  var options={
    url:"https://us20.api.mailchimp.com/3.0/lists/YourListID",
    method:"POST",
    body: jsonData,
    headers:{
      "Authorization":"anantjain54321 Your API KEY"
    }
  };
  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });
});
app.post("/failure.html",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server is running on port 3000 ");
});
