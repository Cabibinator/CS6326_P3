import { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function AnalysisPage() {
  const ref = useRef(null)
  const [legibility, setLegibility] = useState(null);
  const intervalRef = useRef(0);

  const handleClearCanvas = () => {
    ref.current.clearCanvas();
  };
  //TODO tie to timer
  const analyze = () => {
    ref.current.exportImage("jpeg").then(data => {
      //console.log(data);
      imgCall(data);
    })
      .catch(e => {
        console.log(e);
      });

  }

function dataURItoBlob(dataURI) {
     // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});

}

  const imgCall = async (img) => {
    try{
      //console.log(img);
      const blob = dataURItoBlob(img);
      //console.log(blob);
        const file = new File([blob], "image.jpeg", {
          type: 'image/jpeg',
        });
        var formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,    
        });
        
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error || "Prediction request failed.");
        }

        setLegibility(data);
    }
    catch (err) {
      console.error(err);
    }
    
  }

  const legibilityResult = () => { 
    if(legibility?.prediction === 0) 
      {
        return <font color="green">GOOD</font>
    }
    else if (legibility?.prediction === 1)
    {
        return <font color="red">BAD</font>
    }
  }
  return (
    <div>
      <h1>
        { }
        Your handwriting is: {legibilityResult()}
      </h1>
      <div class="row">
        <div class="col-10" id="sketchcontainer">
          <ReactSketchCanvas
            ref={ref}
            className="sketchcanvas"
            strokeWidth={2}
            strokeColor="black"
          />
        </div>
        <div class="col-2" >
          <button class="btn" onClick={handleClearCanvas}>Clear</button>
          <button class="btn" onClick={analyze}>Analyze</button>

        </div>
      </div>

    </div>
  );

}

export default AnalysisPage;