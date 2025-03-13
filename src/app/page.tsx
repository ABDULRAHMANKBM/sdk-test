// pure client view
"use client";

import { useState } from "react";
import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk";

export default function ZoomComponent() {
  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  // const sdkKey = "dmanBmjRTDWXyzi8AoROIw";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  // const meetingNumber = "89011232582";
  const passWord = "0Se1T3";
  const leaveUrl = "https://www.zoom.com/";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!email || !username) {
      setError("Please enter a valid username and email.");
      return;
    }

    // Determine role based on email
    const userRole = determineRole(email);
    setRole(userRole);

    if (userRole === null) {
      setError("Invalid email. Cannot determine role.");
      return;
    }

    setError("");

    // Dynamically import Zoom SDK and start meeting
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
  showMeetingHeader: true,
  isSupportAV: true,
  disableInvite: false,
  disableCallOut: true,
  disableRecord: false,
  disableJoinAudio: false,
  audioPanelAlwaysOpen: false,
  showPureSharingContent: false,
  isSupportChat: true,
  isSupportQA: false,
  isSupportPolling: true,
  isSupportBreakout: true,
  screenShare: true,
  rwcBackup: true,
  videoDrag: true,
  sharingMode: 'both',
  videoHeader: true,
  isLockBottom: false,
  isSupportNonverbal: true,
  isShowJoiningErrorDialog: true,
  disablePreview: false,
  disableCORP: true,
  inviteUrlFormat: '',
  loginWindow: false,
        success: () => {
          ZoomMtg.join({
            meetingNumber: meetingNumber,
            userName: username, // Use username instead of email as the display name
            userEmail: email, // Add email for Zoom metadata
            signature: signature,
            sdkKey: sdkKey,
            success: (res: unknown) => {
              console.log("Join meeting success", res);
            },
            error: (err: unknown) => {
              console.error("Error joining meeting", err);
              setError("Failed to join the meeting.");
            },
          });
        },
        error: (err: unknown) => {
          console.error("Error initializing Zoom SDK", err);
          setError("Failed to initialize Zoom SDK.");
        },
      });
    };

    getSignature();
  };

  const determineRole = (email: string): number => {
    // Host email logic
    if (email === "abdulrahman.kbm02@gmail.com") {
      return 1; // Host role
    }
    return 0; // Participant role
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
      <div id="zmmtg-root"></div>
    </div>
  );
}


// ///////////////////////////////////////////////////////component view //////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk";

// const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
// const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
// const meetingNumber = "89673134606";
// const passWord = "0Se1T3";
// const leaveUrl = "https://www.zoom.com/";

// function ZoomMeeting({ email, username, role }: { email: string; username: string; role: number }) {
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const startMeeting = async () => {
//       try {
//         const { ZoomMtg } = await import("@zoom/meetingsdk");
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareWebSDK();

//         const response = await fetch(authEndpoint, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ meetingNumber, role }),
//         });

//         const { signature } = await response.json();

//         ZoomMtg.init({
//           leaveUrl,
//           success: () => {
//             ZoomMtg.join({
//               meetingNumber,
//               userName: username,
//               userEmail: email,
//               signature,
//               sdkKey,
//               success: (res: unknown) => console.log("Join meeting success", res),
//               error: (err: unknown) => {
//                 console.error("Error joining meeting", err);
//                 setError("Failed to join the meeting.");
//               },
//             });
//           },
//           error: (err: unknown) => {
//             console.error("Error initializing Zoom SDK", err);
//             setError("Failed to initialize Zoom SDK.");
//           },
//         });
//       } catch (err) {
//         console.error("Error fetching signature:", err);
//         setError("Failed to fetch the meeting signature.");
//       }
//     };

//     startMeeting();
//   }, [email, username, role]);

//   return (
//     <div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div id="zmmtg-root"></div>
//     </div>
//   );
// }

// function AuthForm({ onSubmit }: { onSubmit: (email: string, username: string) => void }) {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !username) {
//       setError("Please enter a valid username and email.");
//       return;
//     }
//     setError("");
//     onSubmit(email, username);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <button type="submit">Join Meeting</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </form>
//   );
// }

// export default function ZoomComponent() {
//   const [meetingData, setMeetingData] = useState<{ email: string; username: string; role: number } | null>(null);

//   const determineRole = (email: string): number => {
//     return email === "abdulrahman.kbm02@gmail.com" ? 1 : 0;
//   };

//   const handleJoin = (email: string, username: string) => {
//     const role = determineRole(email);
//     setMeetingData({ email, username, role });
//   };

//   return (
//     <div>
//       <h1>Join Zoom Meeting</h1>
//       {!meetingData ? <AuthForm onSubmit={handleJoin} /> : <ZoomMeeting {...meetingData} />}
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk";
// import { Stage, Layer, Line } from "react-konva";

// const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
// const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
// const meetingNumber = "89673134606";
// const passWord = "0Se1T3";
// const leaveUrl = "https://www.zoom.com/";

// function ZoomMeeting({ email, username, role }: { email: string; username: string; role: number }) {
//   const [error, setError] = useState("");
//   const [lines, setLines] = useState<any[]>([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isAnnotationEnabled, setIsAnnotationEnabled] = useState(true); // Toggle annotation state

//   useEffect(() => {
//     const startMeeting = async () => {
//       try {
//         const { ZoomMtg } = await import("@zoom/meetingsdk");
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareWebSDK();

//         const response = await fetch(authEndpoint, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ meetingNumber, role }),
//         });

//         const { signature } = await response.json();

//         ZoomMtg.init({
//           leaveUrl,
//           showMeetingHeader: true, // Always show header with controls (participants, chat)
//           isSupportAV: true, // Enable audio-video
//           success: () => {
//             ZoomMtg.join({
//               meetingNumber,
//               userName: username,
//               userEmail: email,
//               signature,
//               sdkKey,
//               success: (res: unknown) => console.log("Join meeting success", res),
//               error: (err: unknown) => {
//                 console.error("Error joining meeting", err);
//                 setError("Failed to join the meeting.");
//               },
//             });
//           },
//           error: (err: unknown) => {
//             console.error("Error initializing Zoom SDK", err);
//             setError("Failed to initialize Zoom SDK.");
//           },
//         });
//       } catch (err) {
//         console.error("Error fetching signature:", err);
//         setError("Failed to fetch the meeting signature.");
//       }
//     };

//     startMeeting();
//   }, [email, username, role]);

//   // Annotation Handlers
//   const handleMouseDown = (e: any) => {
//     if (!isAnnotationEnabled) return; // Prevent drawing when annotation is disabled
//     setIsDrawing(true);
//     const pos = e.target.getStage().getPointerPosition();
//     setLines([...lines, { points: [pos.x, pos.y] }]);
//   };

//   const handleMouseMove = (e: any) => {
//     if (!isDrawing || !isAnnotationEnabled) return; // Prevent drawing when annotation is disabled
//     const stage = e.target.getStage();
//     const point = stage.getPointerPosition();
//     const updatedLines = [...lines];
//     updatedLines[updatedLines.length - 1].points.push(point.x, point.y);
//     setLines(updatedLines);
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const clearAnnotations = () => {
//     setLines([]);
//   };

//   const toggleAnnotations = () => {
//     setIsAnnotationEnabled((prev) => !prev); // Toggle annotation state
//   };

//   return (
//     <div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div id="zmmtg-root" style={{ position: "relative" }}></div>

//       {/* Annotation Layer */}
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={handleMouseDown}
//         onMousemove={handleMouseMove}
//         onMouseup={handleMouseUp}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           pointerEvents: isAnnotationEnabled ? "auto" : "none", // Dynamically change pointerEvents
//         }}
//       >
//         <Layer>
//           {lines.map((line, i) => (
//             <Line
//               key={i}
//               points={line.points}
//               stroke="red"
//               strokeWidth={2}
//               tension={0.5}
//               lineCap="round"
//               lineJoin="round"
//             />
//           ))}
//         </Layer>
//       </Stage>

//       {/* Clear Button */}
//       <button
//         onClick={clearAnnotations}
//         style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
//       >
//         Clear Annotations
//       </button>

//       {/* Toggle Annotation Button */}
//       <button
//         onClick={toggleAnnotations}
//         style={{ position: "absolute", top: 60, right: 20, zIndex: 10 }}
//       >
//         {isAnnotationEnabled ? "Disable Annotation" : "Enable Annotation"}
//       </button>
//     </div>
//   );
// }

// function AuthForm({ onSubmit }: { onSubmit: (email: string, username: string) => void }) {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !username) {
//       setError("Please enter a valid username and email.");
//       return;
//     }
//     setError("");
//     onSubmit(email, username);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Join Meeting</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </form>
//   );
// }

// export default function ZoomComponent() {
//   const [meetingData, setMeetingData] = useState<{ email: string; username: string; role: number } | null>(null);

//   const determineRole = (email: string): number => {
//     return email === "abdulrahman.kbm02@gmail.com" ? 1 : 0;
//   };

//   const handleJoin = (email: string, username: string) => {
//     const role = determineRole(email);
//     setMeetingData({ email, username, role });
//   };

//   return (
//     <div>
//       <h1>Join Zoom Meeting</h1>
//       {!meetingData ? <AuthForm onSubmit={handleJoin} /> : <ZoomMeeting {...meetingData} />}
//     </div>
//   );
// }




// ///////////////////////////////////////////////client view with zoom header /////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import type { ZoomMtg as ZoomMtgType } from "@zoom/meetingsdk";

// export default function ZoomComponent() {
//   const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
//   const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
//   const meetingNumber = "89673134606";
//   const passWord = "0Se1T3";
//   const leaveUrl = "https://www.zoom.com/";

//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [role, setRole] = useState<number | null>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Listen for external content interactions and ensure meeting header persists
//     const handleExternalContentOpen = () => {
//       if (window.location.href.includes("/meeting")) {
//         // Ensure Zoom SDK and controls are visible
//         const { ZoomMtg } = require("@zoom/meetingsdk");
//         ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.9/lib", "/av");
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareWebSDK();
//       }
//     };
//     window.addEventListener("focus", handleExternalContentOpen);
//     return () => window.removeEventListener("focus", handleExternalContentOpen);
//   }, []);

//   const handleJoin = async () => {
//     if (!email || !username) {
//       setError("Please enter a valid username and email.");
//       return;
//     }

//     const userRole = determineRole(email);
//     setRole(userRole);

//     if (userRole === null) {
//       setError("Invalid email. Cannot determine role.");
//       return;
//     }

//     setError("");

//     const { ZoomMtg } = await import("@zoom/meetingsdk");
//     ZoomMtg.preLoadWasm();
//     ZoomMtg.prepareWebSDK();

//     const getSignature = async () => {
//       try {
//         const response = await fetch(authEndpoint, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ meetingNumber, role: userRole }),
//         });
//         const { signature } = await response.json();
//         startMeeting(ZoomMtg, signature);
//       } catch (err) {
//         console.error("Error fetching signature:", err);
//         setError("Failed to fetch the meeting signature.");
//       }
//     };

//     const startMeeting = (ZoomMtg: typeof ZoomMtgType, signature: string) => {
//       ZoomMtg.init({
//         leaveUrl: leaveUrl,
//         showMeetingHeader: true, // Ensure header stays visible
//         isSupportAV: true, // Enable audio-video
//         success: () => {
//           ZoomMtg.join({
//             meetingNumber: meetingNumber,
//             userName: username,
//             userEmail: email,
//             signature: signature,
//             sdkKey: sdkKey,
//             success: (res: unknown) => {
//               console.log("Join meeting success", res);
//               // Open participants window after joining the meeting
//               openParticipantsWindow();
//             },
//             error: (err: unknown) => {
//               console.error("Error joining meeting", err);
//               setError("Failed to join the meeting.");
//             },
//           });
//         },
//         error: (err: unknown) => {
//           console.error("Error initializing Zoom SDK", err);
//           setError("Failed to initialize Zoom SDK.");
//         },
//       });
//     };

//     getSignature();
//   };

//   const determineRole = (email: string): number => {
//     if (email === "abdulrahman.kbm02@gmail.com") {
//       return 1; // Host role
//     }
//     return 0; // Participant role
//   };

// const openParticipantsWindow = () => {
//   // Open a new window that will display participants
//   const participantsWindow = window.open(
//     "",
//     "ParticipantsWindow",
//     "width=300,height=600,scrollbars=yes"
//   );

//   // Check if the window was opened successfully
//   if (participantsWindow) {
//     // Populate this window with participant information (or use Zoom's API to get participants)
//     participantsWindow.document.write("<h1>Participants</h1>");
//     participantsWindow.document.write("<ul id='participants-list'></ul>");

//     // Example: Update the participants list dynamically (you would hook into the Zoom API for actual participant data)
//     setInterval(() => {
//       const participantsList = participantsWindow.document.getElementById("participants-list");
//       if (participantsList) {
//         // Simulate adding participants (replace with actual data from Zoom SDK)
//         participantsList.innerHTML = "<li>Participant 1</li><li>Participant 2</li>";
//       }
//     }, 2000); // Update participants every 2 seconds
//   } else {
//     console.error("Failed to open participants window.");
//   }
// };


//   return (
//     <div>
//       <h1>Join Zoom Meeting</h1>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleJoin();
//         }}
//       >
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Join Meeting</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div id="zmmtg-root" style={{ position: "relative" }}></div>
//     </div>
//   );
// }
