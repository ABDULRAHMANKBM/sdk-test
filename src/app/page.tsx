"use client";

import { useState } from "react";
import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk";

export default function ZoomComponent() {
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const leaveUrl = "https://www.zoom.com/";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isMeetingActive, setIsMeetingActive] = useState(false);

  const handleJoin = async () => {
    if (!email || !username) {
      setError("Please enter a valid username and email.");
      return;
    }

    const userRole = determineRole(email);
    setRole(userRole);

    if (userRole === null) {
      setError("Invalid email. Cannot determine role.");
      return;
    }

    setError("");

    const { ZoomMtg } = await import("@zoom/meetingsdk");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    const getSignature = async () => {
      try {
        const response = await fetch(authEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetingNumber, role: userRole }),
        });
        const { signature } = await response.json();
        startMeeting(ZoomMtg, signature);
      } catch (err) {
        console.error("Error fetching signature:", err);
        setError("Failed to fetch the meeting signature.");
      }
    };

    const startMeeting = (ZoomMtg: typeof ZoomMtgType, signature: string) => {
      ZoomMtg.init({
        leaveUrl: leaveUrl,
        success: () => {
          ZoomMtg.join({
            meetingNumber: meetingNumber,
            userName: username,
            userEmail: email,
            signature: signature,
            sdkKey: sdkKey,
            success: () => {
              console.log("Join meeting success");
              setIsMeetingActive(true);
            },
            error: (err: unknown) => {  // Explicitly typed `err`
              console.error("Error joining meeting", err);
              setError("Failed to join the meeting.");
            },
          });
        },
        error: (err: unknown) => {  // Explicitly typed `err`
          console.error("Error initializing Zoom SDK", err);
          setError("Failed to initialize Zoom SDK.");
        },
      });
    };

    getSignature();
  };

  const determineRole = (email: string): number => {
    return email === "abdulrahman.kbm02@gmail.com" ? 1 : 0;
  };

  return (
    <div>
      <h1>Join Zoom Meeting</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleJoin();
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show Zoom Meeting only if isMeetingActive is true */}
      {isMeetingActive && (
        <div id="zmmtg-root" className="fixed left-0 top-0 h-screen w-screen z-[9999] bg-black/80"></div>
      )}
    </div>
  );
}
