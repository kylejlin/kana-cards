import React from "react";
import "../styles/AffirmationSwipeIndicator.css";
import { SwipeDirection } from "../types";

export interface Props {
  selectedSwipeDirection: SwipeDirection;
  normalizedDelta: number;
}

export default function AffirmationSwipeIndicator({
  selectedSwipeDirection,
  normalizedDelta,
}: Props): React.ReactElement {
  switch (selectedSwipeDirection) {
    case "Right":
      return normalizedDelta > 0 ? (
        <div
          className="AffirmationSwipeIndicator--horizontal--correct"
          style={{
            width: normalizedDelta * 100 + "vw",
          }}
        />
      ) : (
        <div
          className="AffirmationSwipeIndicator--horizontal--incorrect"
          style={{
            left: (1 + normalizedDelta) * 100 + "vw",
            width: -normalizedDelta * 100 + "vw",
          }}
        />
      );
    case "Left":
      return normalizedDelta > 0 ? (
        <div
          className="AffirmationSwipeIndicator--horizontal--incorrect"
          style={{
            width: normalizedDelta * 100 + "vw",
          }}
        />
      ) : (
        <div
          className="AffirmationSwipeIndicator--horizontal--correct"
          style={{
            left: (1 + normalizedDelta) * 100 + "vw",
            width: -normalizedDelta * 100 + "vw",
          }}
        />
      );
    case "Up":
      return normalizedDelta > 0 ? (
        <div
          className="AffirmationSwipeIndicator--vertical--incorrect"
          style={{
            height: normalizedDelta * 89 + "vh",
          }}
        />
      ) : (
        <div
          className="AffirmationSwipeIndicator--vertical--correct"
          style={{
            top: 11 + (1 + normalizedDelta) * 89 + "vh",
            height: -normalizedDelta * 89 + "vh",
          }}
        />
      );
    case "Down":
      return normalizedDelta > 0 ? (
        <div
          className="AffirmationSwipeIndicator--vertical--correct"
          style={{
            height: normalizedDelta * 89 + "vh",
          }}
        />
      ) : (
        <div
          className="AffirmationSwipeIndicator--vertical--incorrect"
          style={{
            top: 11 + (1 + normalizedDelta) * 89 + "vh",
            height: -normalizedDelta * 89 + "vh",
          }}
        />
      );
  }
}
