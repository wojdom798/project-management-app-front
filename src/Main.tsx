import React, { useEffect, useState } from "react";

function Main()
{
  const [message, setMessage] = useState<string>("");

  useEffect(() =>
  {
    (async () =>
    {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors" as RequestMode
      };
      const response = await fetch("/api/test", init);
      const data = await response.json();
      setMessage(data.message);
    })();
  }, []);

  return (
    <h1 id="main-header">{message}</h1>
  );
}

export default Main;