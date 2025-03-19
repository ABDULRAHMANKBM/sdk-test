"use client";  // Ensure this is a client-side component

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Zoom SDK with SSR disabled
const ZoomMtgEmbedded = dynamic(() => import("@zoom/meetingsdk/embedded").then((mod) => mod.default), { ssr: false });

const SamplePage = () => {
  const [client, setClient] = useState(null);
  
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const role = 0;
  const userName = "React Test";
  const userEmail = "kassar.abode@gmail.com";

  useEffect(() => {
    if (ZoomMtgEmbedded) {
      const clientInstance = ZoomMtgEmbedded.createClient();
      setClient(clientInstance);
    }
  }, []);

  useEffect(() => {
    const initMeeting = async () => {
      if (client) {
        const signature = await getSignature();
        if (signature) {
          await startMeeting(signature);
        }
      }
    };

    initMeeting();
  }, [client]);

  const getSignature = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json();
      return res.signature as string;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  async function startMeeting(signature: string) {
    const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      });
      await client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: userEmail
      });
      console.log("joined successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample Next.js</h1>
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <button onClick={() => getSignature()}>Join Meeting</button>
      </main>
    </div>
  );
};

export default SamplePage;
