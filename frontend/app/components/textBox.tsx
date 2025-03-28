import React, { useState } from "react";

interface Props {
  title: string;
  action: string;
  messageToShow: string
  takeAction: (message: string, secret: string) => void
}




const TextBox = ({ title, action, messageToShow, takeAction }: Props) => {
  const [message, setMessage] = useState("")
  const [secret, setSecret] = useState("")

  return (
    <div>
      <h1 className="text-center font-bold text-xl">{title}</h1>
      <div className="py-2 px-6 mt-4">
        <textarea
          className="h-32 px-4 py-1 rounded-2xl w-full border-2"
          name=""
          id=""
          onChange={(e) => {setMessage(e.target.value)}}
        />
      </div>

      <div className="flex justify-around mt-5 px-4 py-3">
        <h1 className="font-semibold mt-1">Encryption Key:</h1>
        <input onChange={(e) => {setSecret(e.target.value)}} type="text" className="w-3/5 border-2 px-2 rounded-lg h-10" />
      </div>

      <div className=" flex mt-6 justify-around">
        <button onClick={() => takeAction(message, secret)} className=" font-semibold w-40 text-white h-12 p-1 rounded-xl bg-blue-950">{action}</button>
        <button className=" font-semibold w-40 text-white h-12 p-1 rounded-xl bg-blue-950">copy</button>
      </div>

      <div className="flex space-x-4 mt-5 justify-center py-3">
        <h1 className="font-semibold mt-1">Result:</h1>
        <h1 className="mt-1 w-3/4 font-semibold overflow-x-scroll px-1 border-2" >{messageToShow}</h1>
      </div>
    </div>
  );
};

export default TextBox;
