"use client"; // Ensure this runs only on the client-side

import { useState, useEffect } from "react";

export default function ZoomComponentView() {
  const [client, setClient] = useState<any | null>(null);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const role = 0; // 0 for attendees, 1 for hosts

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@zoom/meetingsdk/embedded").then((ZoomMtgEmbedded) => {
        const zoomClient = ZoomMtgEmbedded.default.createClient();
        setClient(zoomClient);
      });
    }
  }, []);

  const getSignature = async () => {
    if (!email || !username) {
      setError("Please enter a valid username and email.");
      return;
    }

    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role }),
      });

      const { signature } = await response.json();
      startMeeting(signature);
    } catch (err) {
      console.error("Error fetching signature:", err);
      setError("Failed to fetch the meeting signature.");
    }
  };

  const startMeeting = async (signature: string) => {
    if (!client) return;

    const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      });

      await client.join({
        signature,
        sdkKey,
        meetingNumber,
        password: passWord,
        userName: username,
        userEmail: email,
      });

      setIsMeetingActive(true);
      console.log("Joined successfully");
    } catch (error) {
      console.error("Error joining meeting", error);
      setError("Failed to join the meeting.");
    }
  };

  return (
    <div className="App">
      <h1>Join Zoom Meeting</h1>

      {!isMeetingActive && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getSignature();
          }}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Join Meeting</button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Fixed Size Zoom Component View */}
      {isMeetingActive && (
        <div
          id="meetingSDKElement"
          style={{
            width: "800px",
            height: "600px",
            backgroundColor: "#000",
            margin: "20px auto",
            border: "2px solid #0073e6",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        ></div>
      )}
    </div>
  );
}
