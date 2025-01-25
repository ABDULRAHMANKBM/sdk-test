"use client";

import { useEffect } from "react";
import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk"; // Import ZoomMtg type

export default function ZoomComponent() {
  const authEndpoint = "http://localhost:3001/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "85834999284";
  const passWord = "hhSWR1";
  const role = 1;
  const userName = "ABD";
  const leaveUrl = "http://localhost:3000";

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
