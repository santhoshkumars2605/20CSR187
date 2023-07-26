import React, { useEffect, useState } from 'react'
import axios from "axios";
export default function Home() {
const [tok,setTok]=useState();

    useEffect(async()=>{
       await axios.post("http://20.244.56.144/train/auth",{
        companyName: "SkTrains",
        clientID: "2a54e81e-9213-4720-88f1-268d8248630c",
        clientSecret: "CYxqOaFPkOANLtci",
        ownerName: "Sandy",
        ownerEmail: "santhoshkumars.20cse@kongu.edu",
        rollNo: "20CSR187"

    }).then((res)=>{
        
        setTok(res.data.access_token);
    }).catch((err)=>{
        console.log(err);
    })
    await axios.get("http://20.244.56.144/train/trains",{
        headers: {
          'Authorization': `Bearer ${tok}`
        }
      }).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    },[])
  return (
    <div>Home</div>
  )
}