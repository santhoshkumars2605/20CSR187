const { default: axios } = require('axios');
const express = require('express')
const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Running")
})

app.get("/numbers",async(req,res)=>{
    const q= req.query.url;
    var result = [];
    const axiosPromises = q.map(async (i) => {
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
      console.log(result);
      const resp = new Set(result.sort((a, b) => a - b));
    console.log(resp)
    res.send(working);
})

app.listen(8008,()=>{
    console.log("Server Running");
})