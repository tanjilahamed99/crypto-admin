"use client";
import React from "react";
import {
  ConnectWallet,
} from "@thirdweb-dev/react";

const RegistrationFunction = () => {
  return (
    <div>
      <ConnectWallet
        btnTitle="Connect"
        hideBuyButton
        hideNetworkSelector
        className="bg-primary"
      />
    </div>
  );
};

export default RegistrationFunction;
