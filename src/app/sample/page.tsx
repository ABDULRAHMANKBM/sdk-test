// "use client";

// import { useEffect, useState } from "react";

// export default function SamplePage() {
//   const [client, setClient] = useState<any>(null);
//   const [error, setError] = useState("");
//   const [isMeetingActive, setIsMeetingActive] = useState(false);

//   // Replace these with your actual credentials and meeting details
//   const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
//   const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
//   const meetingNumber = "89673134606";
//   const passWord = "0Se1T3";
//   const role = 0;
//   const userName = "React Test";
//   const userEmail = "kassar.abode@gmail.com";
//   // Dynamically import the Zoom SDK only on the client-side
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("@zoom/meetingsdk/embedded")
//         .then((module) => {
//           // The SDK is exported as the default export
//           const ZoomMtgEmbedded = module.default;
//           const zoomClient = ZoomMtgEmbedded.createClient();
//           setClient(zoomClient);
//         })
//         .catch((err) => {
//           console.error("Error loading Zoom SDK:", err);
//           setError("Error loading Zoom SDK");
//         });
//     }
//   }, []);

//   // Function to fetch the meeting signature from your backend
//   const getSignature = async () => {
//     try {
//       const res = await fetch(authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ meetingNumber, role }),
//       });
//       const data = await res.json();
//       return data.signature as string;
//     } catch (err) {
//       console.error("Error fetching signature", err);
//       setError("Error fetching signature");
//       return null;
//     }
//   };

//   // Function to initialize and join the meeting
//   const joinMeeting = async () => {
//     if (!client) {
//       setError("Zoom client not loaded");
//       return;
//     }
//     const signature = await getSignature();
//     if (!signature) {
//       setError("No signature returned");
//       return;
//     }
//     const meetingSDKElement = document.getElementById("meetingSDKElement");
//     try {
//       await client.init({
//         zoomAppRoot: meetingSDKElement!,
//         language: "en-US",
//         patchJsMedia: true,
//         leaveOnPageUnload: true,
//       });
//       await client.join({
//         signature,
//         sdkKey,
//         meetingNumber,
//         password: passWord,
//         userName,
//         userEmail,
//       });
//       setIsMeetingActive(true);
//       console.log("Joined meeting successfully");
//     } catch (err) {
//       console.error("Error joining meeting", err);
//       setError("Error joining meeting");
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-10">
//       <h1 className="text-2xl font-bold mb-4">
//         Next.js Zoom Meeting SDK Component View
//       </h1>
//       {!isMeetingActive && (
//         <button
//           onClick={joinMeeting}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500"
//         >
//           Join Meeting
//         </button>
//       )}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <div
//         id="meetingSDKElement"
//         className="mt-8 border rounded-lg shadow-lg"
//         style={{ width: "800px", height: "600px", margin: "0 auto" }}
//       ></div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// export default function SamplePage() {
//   const [client, setClient] = useState<any>(null);
//   const [error, setError] = useState("");
//   const [isMeetingActive, setIsMeetingActive] = useState(false);

//   // Replace these with your actual credentials and meeting details
//   const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
//   const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
//   const meetingNumber = "89673134606";
//   const passWord = "0Se1T3";
//   const role = 0;
//   const userName = "React Test";
//   const userEmail = "kassar.abode@gmail.com";

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("@zoom/meetingsdk/embedded")
//         .then((module) => {
//           const ZoomMtgEmbedded = module.default;
//           const zoomClient = ZoomMtgEmbedded.createClient();
//           setClient(zoomClient);
//         })
//         .catch((err) => {
//           console.error("Error loading Zoom SDK:", err);
//           setError("Error loading Zoom SDK");
//         });
//     }
//   }, []);

//   const getSignature = async () => {
//     try {
//       const res = await fetch(authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ meetingNumber, role }),
//       });
//       const data = await res.json();
//       return data.signature as string;
//     } catch (err) {
//       console.error("Error fetching signature", err);
//       setError("Error fetching signature");
//       return null;
//     }
//   };

//   const joinMeeting = async () => {
//     if (!client) {
//       setError("Zoom client not loaded");
//       return;
//     }
//     const signature = await getSignature();
//     if (!signature) {
//       setError("No signature returned");
//       return;
//     }
//     const meetingSDKElement = document.getElementById("meetingSDKElement");
//     try {
//       await client.init({
//         zoomAppRoot: meetingSDKElement!,
//         language: "en-US",
//         patchJsMedia: true,
//         leaveOnPageUnload: true,
//       });
//       await client.join({
//         signature,
//         sdkKey,
//         meetingNumber,
//         password: passWord,
//         userName,
//         userEmail,
//       });
//       setIsMeetingActive(true);
//       console.log("Joined meeting successfully");
//     } catch (err) {
//       console.error("Error joining meeting", err);
//       setError("Error joining meeting");
//     }
//   };

//   const toggleFullScreen = () => {
//     const elem = document.getElementById("meetingSDKElement");
//     if (!elem) return;
//     if (!document.fullscreenElement) {
//       elem.requestFullscreen().catch((err) => {
//         console.error(
//           `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
//         );
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-10">
//       <h1 className="text-2xl font-bold mb-4">
//         Next.js Zoom Meeting SDK Component View
//       </h1>
//       {!isMeetingActive && (
//         <button
//           onClick={joinMeeting}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500"
//         >
//           Join Meeting
//         </button>
//       )}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {isMeetingActive && (
//         <button
//           onClick={toggleFullScreen}
//           className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
//         >
//           Toggle Full Screen
//         </button>
//       )}
//       <div
//         id="meetingSDKElement"
//         className="mt-8 border rounded-lg shadow-lg"
//         style={{ width: "800px", height: "600px", margin: "0 auto" }}
//       ></div>
//     </div>
//   );
// }



// full dimensions
// "use client";

// import { useEffect, useState } from "react";

// export default function SamplePage() {
//   const [client, setClient] = useState<any>(null);
//   const [error, setError] = useState("");
//   const [isMeetingActive, setIsMeetingActive] = useState(false);

//   // Replace these with your actual credentials and meeting details
//   const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
//   const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
//   const meetingNumber = "89673134606";
//   const passWord = "0Se1T3";
//   const role = 0;
//   const userName = "React Test";
//   const userEmail = "kassar.abode@gmail.com";
  
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("@zoom/meetingsdk/embedded")
//         .then((module) => {
//           const ZoomMtgEmbedded = module.default;
//           const zoomClient = ZoomMtgEmbedded.createClient();
//           setClient(zoomClient);
//         })
//         .catch((err) => {
//           console.error("Error loading Zoom SDK:", err);
//           setError("Error loading Zoom SDK");
//         });
//     }
//   }, []);

//   const getSignature = async () => {
//     try {
//       const res = await fetch(authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ meetingNumber, role }),
//       });
//       const data = await res.json();
//       return data.signature as string;
//     } catch (err) {
//       console.error("Error fetching signature", err);
//       setError("Error fetching signature");
//       return null;
//     }
//   };

//   const joinMeeting = async () => {
//     if (!client) {
//       setError("Zoom client not loaded");
//       return;
//     }
//     const signature = await getSignature();
//     if (!signature) {
//       setError("No signature returned");
//       return;
//     }
//     const meetingSDKElement = document.getElementById("meetingSDKElement");
//     try {
//       await client.init({
//         zoomAppRoot: meetingSDKElement!,
//         language: "en-US",
//         patchJsMedia: true,
//         leaveOnPageUnload: true,
//       });
//       await client.join({
//         signature,
//         sdkKey,
//         meetingNumber,
//         password: passWord,
//         userName,
//         userEmail,
//       });
//       setIsMeetingActive(true);
//       console.log("Joined meeting successfully");
//     } catch (err) {
//       console.error("Error joining meeting", err);
//       setError("Error joining meeting");
//     }
//   };

//   const toggleFullScreen = () => {
//     const elem = document.getElementById("meetingSDKElement");
//     if (!elem) return;
//     if (!document.fullscreenElement) {
//       elem.requestFullscreen().catch((err) => {
//         console.error(
//           `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
//         );
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-10">
//       <h1 className="text-2xl font-bold mb-4">
//         Next.js Zoom Meeting SDK Component View
//       </h1>
//       {!isMeetingActive && (
//         <button
//           onClick={joinMeeting}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500"
//         >
//           Join Meeting
//         </button>
//       )}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {isMeetingActive && (
//         <button
//           onClick={toggleFullScreen}
//           className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
//         >
//           Toggle Full Screen
//         </button>
//       )}
//       <div
//         id="meetingSDKElement"
//         className="mt-8 border rounded-lg shadow-lg overflow-hidden"
//         style={{ width: "1000px", height: "700px", margin: "0 auto", position: "relative" }}
//       ></div>
//     </div>
//   );
// }

// render chat  ,.. inside the container
"use client";

import { useEffect, useState } from "react";

export default function SamplePage() {
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState("");
  const [isMeetingActive, setIsMeetingActive] = useState(false);

  // Replace these with your actual credentials and meeting details
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const role = 0;
  const userName = "React Test";
  const userEmail = "kassar.abode@gmail.com";
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@zoom/meetingsdk/embedded")
        .then((module) => {
          const ZoomMtgEmbedded = module.default;
          const zoomClient = ZoomMtgEmbedded.createClient();
          setClient(zoomClient);
        })
        .catch((err) => {
          console.error("Error loading Zoom SDK:", err);
          setError("Error loading Zoom SDK");
        });
    }
  }, []);

  const getSignature = async () => {
    try {
      const res = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role }),
      });
      const data = await res.json();
      return data.signature as string;
    } catch (err) {
      console.error("Error fetching signature", err);
      setError("Error fetching signature");
      return null;
    }
  };

  const joinMeeting = async () => {
    if (!client) {
      setError("Zoom client not loaded");
      return;
    }
    const signature = await getSignature();
    if (!signature) {
      setError("No signature returned");
      return;
    }
    const meetingSDKElement = document.getElementById("meetingSDKElement");
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement!,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
        // The customize object below attempts to force the chat, invite, and participants 
        // panels to render inline within the meeting container instead of as popups.
        customize: {
          video: {
            isResizable: true, // Allow users to resize the video container
            viewSizes: {
              default: { width: 800, height: 600 }, // Default view size
              ribbon: { width: 1200, height: 150 },  // Ribbon view size
            },
          },
          toolbar: {
            buttons: [
              {
                text: "Toggle Full Screen",
                className: "CustomButton",
                onClick: () => {
                  if (!document.fullscreenElement) {
                    meetingSDKElement?.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                },
              },
            ],
          },
          chat: {
            popper: false, // Render chat inside the container
          },
          invite: {
            popper: false, // Render invite panel inline
          },
          participant: {
            popper: false, // Render participants panel inline
          },
          // Optionally, control what meeting info is displayed:
          meetingInfo: ["topic", "host", "mn", "pwd", "telPwd"],
        },
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
    } catch (err) {
      console.error("Error joining meeting", err);
      setError("Error joining meeting");
    }
  };

  const toggleFullScreen = () => {
    const elem = document.getElementById("meetingSDKElement");
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
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
      {isMeetingActive && (
        <button
          onClick={toggleFullScreen}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Toggle Full Screen
        </button>
      )}
      <div
        id="meetingSDKElement"
        className="mt-8 border rounded-lg shadow-lg overflow-hidden"
        style={{ width: "1000px", height: "700px", margin: "0 auto", position: "relative" }}
      ></div>
    </div>
  );
}
