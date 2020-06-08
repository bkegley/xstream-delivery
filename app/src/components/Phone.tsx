import React from "react";
import { Phone as PhoneIcon } from "react-feather";
import { useSocket } from "../utils";

export const Phone = () => {
  const socket = useSocket();
  const [isRinging, setIsRinging] = React.useState(false);
  React.useEffect(() => {
    socket.on("ringing", (ringing: boolean) => {
      setIsRinging(ringing);
    });
    return () => socket.close();
  }, []);

  return (
    <div className="absolute top-0 left-0 ml-10 mt-10">
      <PhoneIcon color={isRinging ? "red" : "black"} size={48} />
    </div>
  );
};
