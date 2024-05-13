import React from "react";

import { SpinnerDotted } from "spinners-react";

export const LoadingFile = () => {
  return (
    <SpinnerDotted
      size={10}
      color="white"
      thickness={15}
      style={{
        backgroundColor: "gray.800",
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    />
  );
};
export default LoadingFile;
