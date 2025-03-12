// src/midtrans.ts

import * as midtrans from "midtrans-client";

// Initialize Midtrans configuration
const snap = new midtrans.Snap({
  isProduction: false,
  clientKey: "SB-Mid-client-eX9AiCIbkrWJF6sE",
  serverKey: "SB-Mid-server-ZFpaOms_cvinPBGYg39IC2tI",
});

export { snap };
