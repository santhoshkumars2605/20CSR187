import React, { useEffect, useState } from 'react'
import axios from "axios";
import Card from 'react-bootstrap/Card';
export default function Home() {
const [tok,setTok]=useState();
const [data,setData] = useState();
    useEffect(async()=>{
       await axios.post("http://20.244.56.144/train/auth",{
        companyName: "SkTrains",
        clientID: "2a54e81e-9213-4720-88f1-268d8248630c",
        clientSecret: "CYxqOaFPkOANLtci",
        ownerName: "Sandy",
        ownerEmail: "santhoshkumars.20cse@kongu.edu",
        rollNo: "20CSR187"

    }).then(async(res)=>{
        
        setTok(res.data.access_token);
        await axios.get("http://20.244.56.144/train/trains",{
        headers: {
          'Authorization': `Bearer ${res.data.access_token}`
        }
      }).then((res)=>{

        console.log(res.data);
        setData(res.data);
    }).catch((err)=>{
        console.log(err);
    })
    }).catch((err)=>{
        console.log(err);
    })
    
    },[])
  return (
    <>
    <Container>
    {
     data.map((items,index)=>{
     return (<Card key={index} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{items.trainName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{items.trainNumber}</Card.Subtitle>
        <Card.Text>
            Seats Sleeper : {items.seatsAvailable.sleeper} Price : {items.price.sleeper}<br/>
            Seats AC : {items.seatsAvailable.AC} Price : {items.price.AC} <br/>
        </Card.Text>
        <Card.Link href={`/train?id=${items.trainNumber}`}>Check</Card.Link>
      </Card.Body>
    </Card>)
    })
}
    </Container>
    </>
  )
}