const { default: axios } = require('axios');
const express = require('express')
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Running")
})

app.get("/numbers",async(req,res)=>{
    const arr= req.query.url;
    var result = [];
    const axiosPromises = arr.map(async (i) => {
        try {
          await axios.get(i).then((resp)=>{
        
          console.log(resp.data.numbers);
          result=result.concat(resp.data.numbers);
          }).catch((err)=>{
            console.log("Not Found")
          });
        } catch (err) {
          console.log("Not Found");
        }
      });
      await Promise.all(axiosPromises);
    //   console.log(result);
      const newRusult = new Set([...result].sort((a, b) => a - b));
    //   console.log("newReult",newRusult);

      res.json({"numbers":[...newRusult]});
})

app.listen(8008,()=>{
    console.log("Server Running");
})