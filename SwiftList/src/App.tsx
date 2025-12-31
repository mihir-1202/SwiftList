import { useState } from 'react'
import './App.css'
import type { ExtensionMessage } from "./types";


//convert the file to base64 string
function fileToBase64(file: File): Promise<string>
{
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); //callback when the file is read successfully -> return the base64 string
    reader.onerror = () => reject(new Error("Failed to read file")); //callback when the file is read unsuccessfully
    reader.readAsDataURL(file); //read the file as a data URL
  })
}

async function openDepop(file: File | null): Promise<void>
{
  if (!file)
      return;
  const base64Image = await fileToBase64(file);
  const message: ExtensionMessage = {action: "openDepop", base64Image: base64Image};
  chrome.runtime.sendMessage(message);
}

async function openGrailed(file: File | null): Promise<void>
{
  if (!file)
    return;
  const base64Image = await fileToBase64(file);
  const message: ExtensionMessage = {action: "openGrailed", base64Image: base64Image};
  chrome.runtime.sendMessage(message);
}


function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <input type = "file" accept = "image/*" onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null) } />

      <img src = {file ? URL.createObjectURL(file) : ""} alt = "preview" style = {{maxWidth: "300px", maxHeight: "300px"}} />

      <div className = "card">
        <button onClick = { () => openDepop(file) }> Click to open depop in a side tab </button>
      </div>

      <div className = "card">
        <button onClick = { () => openGrailed(file) }> Click to open grailed in a side tab </button>
      </div>
      
    </>
  )
}

export default App
