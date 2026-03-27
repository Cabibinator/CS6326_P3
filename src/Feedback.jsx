import { useState } from "react";

function FeedbackPage({ setPage }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    console.log(file);
    setError(null);
    setLoading(true);
    setEmailSent(false);
    setEmailLoading(false);

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Prediction request failed.");
      }

      setResult(data);
      setShowNotify(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async () => {
    setEmailLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prediction", result.prediction);

      const res = await fetch("http://127.0.0.1:5001/send", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      setEmailSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h2>Upload for Review</h2>


      <div class="mb-3" >
         <label for="formFile" class="form-label">Please upload your image for review.</label>
  
        <input
          class="form-control"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button class="btn btn-info" onClick={handleUpload} style={{ marginTop: "10px" }}>
          Submit
        </button>
</div>

        {loading && <p>Analyzing… please wait.</p>}
        {error && (
          <p style={{ color: "#ff8484", marginTop: "15px" }}>
            Error: {error}
          </p>
        )}
        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#2a2b2f",
              borderRadius: "8px",
              border: "1px solid #444",
            }}
          >
            <p>The handwriting has been processed, and is considered: {result.prediction === 0 ? "GOOD" : "BAD"}</p>
            {showNotify && (
              <div style={{ marginTop: "10px" }}>
                <button onClick={handleNotify} disabled={emailLoading || emailSent}>
                  {emailLoading ? "Sending..." : emailSent ? "Email Sent!" : "Notify Professor"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackPage;