"use client";

import { useCallback, useEffect, useState } from "react";

type UseRowHighlightOptions = {
  rowsCount: number;
  intervalMs: number;
  isActive: boolean;
};

export const useRowHighlight = ({
  rowsCount,
  intervalMs,
  isActive,
}: UseRowHighlightOptions) => {
  const [autoRow, setAutoRow] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    if (!isActive || hoveredRow !== null) return undefined;

    const id = setInterval(() => {
      setAutoRow((row) => (row + 1) % rowsCount);
    }, intervalMs);

    return () => clearInterval(id);
  }, [isActive, hoveredRow, intervalMs, rowsCount]);

  const hoverRow = useCallback((row: number) => {
    setHoveredRow(row);
  }, []);

  const leaveRow = useCallback((row: number) => {
    setAutoRow(row);
    setHoveredRow(null);
  }, []);

  return { activeRow: hoveredRow ?? autoRow, hoverRow, leaveRow };
};
