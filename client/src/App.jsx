import {useEffect, useState} from "react";
import api from "./services/api";

function App(){

  const [message,setMessage] = useState("");

  useEffect(()=>{
    const checkServer = async()=>{
      try{
        const response = await api.get("/health");
        setMessage(response.data.message);
      } catch(error){
        console.error(error);
      }
    };
    checkServer();
  },[]);

  return(
    <div>
      <h1>CampusConnect</h1>
      <p>Student ecosystem platform</p>
      <p>{message}</p>
    </div>
  );
}

export default App;