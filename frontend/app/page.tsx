"use client";
import {
  useDecryptWith3DESMutation,
  useDecryptWithAESMutation,
  useDecryptWithOTPMutation,
  useEncryptWith3DESMutation,
  useEncryptWithAESMutation,
  useEncryptWithOTPMutation,
} from "@/lib/redux/api/getApi";
import { useState } from "react";

export default function Home() {
  const [method, setMethod] = useState("aes");
  const [encryptMessage, setEncryptMessage] = useState("");
  const [decryptMessage, setDecryptMessage] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [enMessage, setEnMessage] = useState("");
  const [decMessage, setDecMessage] = useState("");

  const [encryptWithAES] = useEncryptWithAESMutation();
  const [decryptWithAES] = useDecryptWithAESMutation();
  const [encryptWith3DES] = useEncryptWith3DESMutation();
  const [decryptWith3DES] = useDecryptWith3DESMutation();
  const [encryptWithOTP] = useEncryptWithOTPMutation();
  const [decryptWithOTP] = useDecryptWithOTPMutation();

  const setMethodOfEncryption = (choice: string) => {
    setMethod(choice);
  };

  interface typeData {
    message: string;
    secret: string;
  }
  interface typeResult {
    data: {};
  }

  const handleEncrypt = async (
    message: string,
    secret: string,
    encryptionMethod: (data: typeData) => void
  ) => {
    try {
      const data = {
        message: message,
        secret: secret,
      };

      const result: any = await encryptionMethod(data);
      console.log("result", result);
      setEnMessage(result.data.encryptedMessage);
    } catch (error) {
      console.log("error", error);
      alert("Failed");
    }
  };

  const handleDecrypt = async (
    message: string,
    secret: string,
    decryptionMethod: (data: typeData) => void
  ) => {
    try {
      const data = {
        message: message,
        secret: secret,
      };

      const result: any = await decryptionMethod(data);
      setDecMessage(result.data.decryptedMessage);
    } catch (error) {
      alert("Failed");
    }
  };

  const handleGeneralEncryption = () => {
    if (method === "aes") {
      handleEncrypt(encryptMessage, encryptKey, encryptWithAES);
    } else if (method === "3des") {
      handleEncrypt(encryptMessage, encryptKey, encryptWith3DES);
    } else {
      handleEncrypt(encryptMessage, encryptKey, encryptWithOTP);
    }
  };

  const handleGeneralDecryption = () => {
    if (method === "aes") {
      handleDecrypt(decryptMessage, decryptKey, decryptWithAES);
    } else if (method === "3des") {
      handleDecrypt(decryptMessage, decryptKey, decryptWith3DES);
    } else {
      handleDecrypt(decryptMessage, decryptKey, decryptWithOTP);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="bg-gray-300 min-h-screen p-4">
      <h1 className="text-4xl text-black font-extrabold text-center mt-10">
        Secure Encryption Tool
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column - Encryption */}
        <div className="p-4">
          <h2 className="text-lg text-black font-bold text-center mb-2">
            Message to Encrypt
          </h2>
          <textarea
            className="w-full h-32 border-2 text-black border-gray-400 p-2 mb-4"
            value={encryptMessage}
            onChange={(e) => setEncryptMessage(e.target.value)}
          />

          <div className="flex items-center mb-4">
            <label className="text-red-600 font-medium mr-2">
              Encryption Key
            </label>
            <input
              type="text"
              className="flex-1 text-black border-2 border-gray-400 p-1"
              value={encryptKey}
              onChange={(e) => setEncryptKey(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleGeneralEncryption}
              className="bg-teal-800 text-white px-4 py-2 hover:bg-teal-700"
            >
              Encrypt
            </button>
            <button
              onClick={() => copyToClipboard(enMessage)}
              className="bg-maroon-800 text-white px-4 py-2 hover:bg-maroon-700"
              style={{ backgroundColor: "#800000" }}
            >
              Copy Encryption
            </button>
          </div>

          <div className="relative">
            <textarea
              className="w-full text-black h-32 border-2 border-gray-400 p-2"
              value={enMessage}
              readOnly
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-1 border-t border-gray-400">
              <span>◄</span>
              <div className="h-2 w-full mx-2 bg-gray-300">
                <div className="h-full w-1/3 bg-gray-500"></div>
              </div>
              <span>►</span>
            </div>
          </div>
        </div>

        {/* Right Column - Decryption */}
        <div className="p-4">
          <h2 className="text-lg text-black font-bold text-center mb-2">
            Message to Decrypt
          </h2>
          <textarea
            className="w-full h-32 border-2 text-black border-gray-400 p-2 mb-4"
            value={decryptMessage}
            onChange={(e) => setDecryptMessage(e.target.value)}
          />

          <div className="flex items-center mb-4">
            <label className="text-red-600 font-medium mr-2">
              Decryption Key
            </label>
            <input
              type="text"
              className="flex-1 border-2 text-black border-gray-400 p-1"
              value={decryptKey}
              onChange={(e) => setDecryptKey(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleGeneralDecryption}
              className="bg-teal-800 text-white px-4 py-2 hover:bg-teal-700"
            >
              Decrypt
            </button>
            <button
              onClick={() => copyToClipboard(decMessage)}
              className="bg-maroon-800 text-white px-4 py-2 hover:bg-maroon-700"
              style={{ backgroundColor: "#800000" }}
            >
              Copy Decryption
            </button>
          </div>

          <div className="relative">
            <textarea
              className="w-full h-32 text-black border-2 border-gray-400 p-2"
              value={decMessage}
              readOnly
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-1 border-t border-gray-400">
              <span>◄</span>
              <div className="h-2 w-full mx-2 bg-gray-300">
                <div className="h-full w-1/3 bg-gray-500"></div>
              </div>
              <span>►</span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Selector at the bottom */}
      <div className="max-w-6xl mx-auto mt-4 flex justify-center gap-2">
        <button className="bg-blue-800 text-white px-4 py-2">
          Choose Algorithm
        </button>
        <select
          className="border-2 text-black border-gray-400 px-4 py-2 bg-gray-100 w-96"
          value={method}
          onChange={(e) => setMethodOfEncryption(e.target.value)}
        >
          <option value="aes">AES</option>
          <option value="3des">3DES</option>
          <option value="otp">OTP</option>
        </select>
      </div>
    </main>
  );
}
