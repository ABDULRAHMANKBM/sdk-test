"use client";

import { useEffect } from "react";
import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk"; // Import ZoomMtg type

export default function ZoomComponent() {
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "85025148599";
  const passWord = "B885CE";
  const role = 1;
  const userName = "ABD";
  const leaveUrl = "https://sdk-test-5h1iuxbpz-abdulrahman-kbms-projects.vercel.app";

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import the Zoom SDK
      const loadZoomSDK = async () => {
        const { ZoomMtg } = await import("@zoom/meetingsdk");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        const getSignature = async () => {
          try {
            const response = await fetch(authEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ meetingNumber, role }),
            });
            const { signature } = await response.json();
            startMeeting(ZoomMtg, signature);
          } catch (error) {
            console.error("Error fetching signature:", error);
          }
        };

        const startMeeting = (
          ZoomMtg: typeof ZoomMtgType,
          signature: string
        ) => {
          ZoomMtg.init({
            leaveUrl: leaveUrl,
            success: () => {
              ZoomMtg.join({
                meetingNumber: meetingNumber,
                userName: userName,
                signature: signature,
                sdkKey: sdkKey,
                passWord: passWord,
                success: (res: unknown) => {
                  console.log("Join meeting success", res);
                },
                error: (err: unknown) => {
                  console.error("Error joining meeting", err);
                },
              });
            },
            error: (err: unknown) => {
              console.error("Error initializing Zoom SDK", err);
            },
          });
        };

        getSignature();
      };

      loadZoomSDK();
    }
  }, []);

  return <div id="zmmtg-root"></div>;
}
