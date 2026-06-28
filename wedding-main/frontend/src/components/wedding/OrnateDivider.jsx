import React from "react";

export const OrnateDivider = ({ symbol = "❦", className = "" }) => {
  return (
    <div className={`flex items-center gap-3 w-full max-w-xs mx-auto ${className}`}>
      <div className="ornate-line" />
      <span className="text-gold-light text-base tracking-widest select-none" aria-hidden="true">
        {symbol}
      </span>
      <div className="ornate-line" />
    </div>
  );
};

export default OrnateDivider;
