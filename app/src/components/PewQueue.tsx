import React from "react";
import { useSocket } from "../utils";

export const PewQueue = () => {
  const [pewQueue, setPewQueue] = React.useState([]);
  const socket = useSocket();

  React.useEffect(() => {
    socket.on("pewpew", (pew) => {
      setPewQueue((old) => old.concat(pew));
    });
    return () => socket.close();
  }, []);

  return (
    <div className="absolute top-0 right-0 mt-10 mr-10">
      <h1>PewQueue</h1>
      <pre>{JSON.stringify(pewQueue, null, 2)}</pre>
    </div>
  );
};
