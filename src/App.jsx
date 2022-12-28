import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [mainData, setMainData] = useState()
  const [uploadFile, setUploadFile] = useState();

  useEffect(() => {
    debugger
    fetch('http://localhost:3001/api/video')
      .then(response => response.json())
      .then(data => setMainData(data))
  }, [])

  const fileHendler = (event) => {
    console.log(event.target.files[0])
    setUploadFile(event.target.files[0])
  }


  const loadHendler = async () => {
    if (!uploadFile) {
      alert('Выберите файл')
      return
    }

    const formData = new FormData()
    formData.append("video", uploadFile)
    const res = await fetch('http://localhost:3001/api/video', {
      method: 'POST',
      body: formData
    })
    const data1 = await res.json()
    console.log(data1)
  }

  return (


    <div className="App">
      <input
        type="file"
        onChange={fileHendler}
      />

      <button onClick={loadHendler}>send</button>

      {mainData ? mainData.map(i => <Video key={i._id} video={i.video} />) : null}

      {/* {mainData ? mainData.map(i => <img key={i._id} src={`http://localhost:3001/${i.video}`} alt='чет сломалось' />) : null} */}
    </div>
  );
}



const Video = (props) => {
  return (
    <video width="320" height="240" controls>
      <source src={`http://localhost:3001/${props.video}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}



export default App;
