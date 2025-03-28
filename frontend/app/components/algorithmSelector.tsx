import React from "react";

interface Props {
  setMethodOfEncryption: (choice: string) => void
}
 
interface typeValue {
  value: string
}

const AlgorithmSelector = ({setMethodOfEncryption}: Props) => {
  return (
    <div className=" border-2 w-1/3 px-4 pt-3 pb-10 rounded-xl">
      <div className="mt-3">
        <h1 className="text-2xl font-bold">Select Algorithm</h1>
        <h3 className="mt-1 text-gray-500 text-md">Choose the Encryption algorithm to use</h3>
      </div>
      <div className="flex justify-center">
        <div className="mt-4 text-center py-2 px-1 border-2 w-3/4">
          <select onChange={(e) => {setMethodOfEncryption(e.target.value)}} name="" id="">
            <option value="aes">Advanced Encryption Standard (AES)</option>
            <option value="3des">Triple DES (3DES)</option>
            <option value="otp">One-Time Pad (OTP)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
