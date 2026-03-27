import React, { useState } from "react";

//Add videos here
const videos = [
  {
    id: 1,
    title: "Test Video",
    description: "This is the first sample video used for demonstration.",
    src: "/videos/HCI_TestVid1.mp4",
  },
  {
    id: 2,
    title: "Test Video 2",
    description: "This is the second sample video used for demonstration.",
    src: "/videos/HCI_TestVid2.mp4",
  },
  {
    id: 3,
    title: "Test Video 3",
    description: "This is the third sample video used for demonstration.",
    src: "/videos/HCI_TestVid3.mp4",
  },
];

export default function VideoDashboard({ setPage }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const ROW_HEIGHT = 200; // Fixed height for videos and description boxes; can be changed

  return (
    <div>
      <style>
        
      </style>
      
      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        {/* LEFT: Videos */}
        <div>
          <h2 style={{ color: "white", marginBottom: "12px" }}>Videos</h2>

          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              style={{
                width: "100%",
                height: `${ROW_HEIGHT}px`,
                marginBottom: "12px",
                cursor: "pointer",
                backgroundColor: "#000",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                src={video.src}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // Keeps full frame is visible (no cropping)
                }}
                muted
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Video Descriptions */}
        <div>
          <h2 style={{ color: "white", marginBottom: "12px" }}>
            Video Descriptions
          </h2>

          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                backgroundColor: "#2a2b2f",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                marginBottom: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                height: `${ROW_HEIGHT}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxSizing: "border-box", // Keeps equal outer height
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "13px",
                  lineHeight: "1.2",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {video.title}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#ccc",
                  lineHeight: "1.2",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {video.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL VIDEO PLAYER */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              backgroundColor: "#000",
              padding: "10px",
              width: "80%",
              maxWidth: "800px",
              borderRadius: "8px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "4px",
                zIndex: 10,
              }}
            >
              ×
            </button>

            <video controls autoPlay style={{ width: "100%" }}>
              <source src={selectedVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}