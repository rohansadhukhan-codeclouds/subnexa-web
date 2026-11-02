"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

type QuantityStepperProps = {
  value: number;
  label: string;
  onChange: (quantity: number) => void;
};

export function QuantityStepper({ value, label, onChange }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/15">
      <IconButton
        aria-label={`Decrease ${label}`}
        size="small"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <IconButton
        aria-label={`Increase ${label}`}
        size="small"
        onClick={() => onChange(value + 1)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
