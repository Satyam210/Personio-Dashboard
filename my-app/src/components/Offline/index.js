import React, { useState } from "react";

const Offline = () => {
  const [offline, setOffline] = useState();
  React.useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  });

  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      setOffline(false);
    } else {
      setOffline(true);
    }
  };

  return (
    <>
      {offline && (
        <>
          <div
            style={{
              width: `100%`,
              padding: `0 64px`,
              height: `64px`,
              display: "flex",
              background: `linear-gradient(to left, #ff5757, #d02035)`,
              zIndex: 90,
              cursor: `default`,
              textShadow: `0 1px rgba(0,0,0,0.15)`,
              alignItems: `center`,
              justifyContent: `center`,
              position: `fixed`,
              marginBottom: 30,
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: `1rem`,
                color: `#fff`,
                padding: `0 10px`,
                marginRight: `1em`,
              }}
            >
              Your device lost its internet connection. Please check your
              Internet connection
            </p>
            <button
              style={{
                margin: `auto 2em`,
                padding: `1em 2em`,
                background: "white",
              }}
              onClick={() => {
                window.location.reload();
              }}
            >
              RELOAD
            </button>
          </div>
          <div style={{ height: `64px` }}></div>
        </>
      )}
    </>
  );
};

export default Offline;
