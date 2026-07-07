export type SwapDirection = "from" | "to";

export type SwapPreviewPayload = {
  fromAssetId: number;
  toAssetId: number;
  direction: SwapDirection;
  amount: string;
  balanceType: ["main", "trade"];
};

export type SwapPreview = {
  estimatedGive: string;
  estimatedReceive: string;
  estimatedRate: string;
  estimatedUsdtEquivalent: string;
};
