import { Loader } from "lucide-react";
import React from "react";

function Spinner({ size = 24 }: { size?: number }) {
  return <Loader size={size} className="animate-spin text-primary" />;
}

export default Spinner;
