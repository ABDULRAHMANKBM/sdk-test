// pages/sample/page.tsx or src/app/sample/page.tsx

import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

function App() {
  const client = ZoomMtgEmbedded.createClient();

  const authEndpoint = "https://sdk-backend.onrender.com/signature/generate-signature";
  const sdkKey = "pveTfB7SSbKO9aYuK5hWBw";
  const meetingNumber = "89673134606";
  const passWord = "0Se1T3";
  const role = 0;
  const userName = "React Test";
  const userEmail = "kassar.abode@gmail.com";

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
      const signature = res.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.log(e);
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
      <main className="w-3/4 mx-auto text-center">
        <h1 className="text-xl font-bold mb-6">Zoom Meeting SDK Sample React</h1>
        {/* For Component View */}
        <div id="meetingSDKElement" className="border rounded-lg bg-white shadow-md">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <button
          onClick={getSignature}
          className="mt-5 bg-blue-600 text-white py-2 px-10 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Join Meeting
        </button>
      </main>
    </div>
  );
}

export default App;
