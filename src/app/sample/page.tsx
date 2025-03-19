"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Zoom SDK (Component View) with SSR disabled
const ZoomMtgEmbedded = dynamic(
  () =>
    import("@zoom/meetingsdk/embedded").then((mod) => mod.default),
  { ssr: false }
);

export default function ZoomComponentView() {
  const [client, setClient] = useState<any>(null);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [error, setError] = useState("");

  // Replace these with your actual credentials and meeting details
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const role = 0;
  const userName = "React Test";
  const userEmail = "kassar.abode@gmail.com";
  // Initialize the Zoom client once on the client-side
  useEffect(() => {
    if (typeof window !== "undefined" && ZoomMtgEmbedded) {
      const zoomClient = ZoomMtgEmbedded.createClient();
      setClient(zoomClient);
    }
  }, []);

  // Function to fetch the meeting signature from your backend
  const getSignature = async () => {
    try {
      const res = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role }),
      });
      const data = await res.json();
      return data.signature as string;
    } catch (error) {
      console.error("Error fetching signature:", error);
      setError("Failed to fetch signature.");
      return null;
    }
  };

  // Function to initialize and join the meeting
  const joinMeeting = async () => {
    if (!client) {
      setError("Zoom Client not loaded.");
      return;
    }
    const signature = await getSignature();
    if (!signature) return;
    const meetingSDKElement = document.getElementById("meetingSDKElement");
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement!,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      });
      await client.join({
        signature,
        sdkKey,
        meetingNumber,
        password: passWord,
        userName,
        userEmail,
      });
      setIsMeetingActive(true);
      console.log("Joined meeting successfully");
    } catch (error) {
      console.error("Error joining meeting:", error);
      setError("Error joining meeting.");
    }
  };

  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-2xl font-bold mb-4">
        Next.js Zoom Meeting SDK Component View
      </h1>
      {!isMeetingActive && (
        <button
          onClick={joinMeeting}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Join Meeting
        </button>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div
        id="meetingSDKElement"
        className="mt-8 border rounded-lg shadow-lg"
        style={{ width: "800px", height: "600px", margin: "0 auto" }}
      >
        {/* The Zoom meeting component view will be rendered here */}
      </div>
    </div>
  );
}
