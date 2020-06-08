import React from "react";
import { useSocket } from "../utils/useSocket";
import { Phone } from "../components/Phone";
import { PewQueue } from "../components/PewQueue";

const IndexPage = () => {
  const socket = useSocket();
  const [deliverySession, setDeliverySession] = React.useState(null);
  React.useEffect(() => {
    socket.on("delivery-session-created", (deliverySession) => {
      setDeliverySession(deliverySession);
    });

    return () => socket.close();
  }, []);
  return (
    <div className="min-w-screen min-h-screen">
      <h1>xStream Delivery</h1>
      <Phone />
      <PewQueue />
      <pre>{JSON.stringify(deliverySession, null, 2)}</pre>
    </div>
  );
};

export default IndexPage;
