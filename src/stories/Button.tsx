import { css } from "@plumeria/core";
import { useState, type ReactNode, type MouseEvent } from "react";

// リップルエフェクト
const rippleEffect = css.keyframes({
  to: {
    transform: "scale(4)",
    opacity: 0,
  },
});

// スピナーアニメーション
const spin = css.keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const styles = css.create({
  // ベーススタイル
  button: {
    position: "relative",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      filter: "brightness(0.95)",
      transform: "translateY(-1px)",
      boxShadow: "0 7px 10px rgba(0, 0, 0, 0.15)",
    },
    "&:active": {
      transform: "translateY(-1px) scale(0.98)",
      filter: "brightness(0.9)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    "&:focus": {
      outline: "none",
    },
    "&[disabled]": {
      opacity: 0.6,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },

  // バリアント
  primary: {
    background: "linear-gradient(-45deg, #0EA5E9, #38BDF8)", // orange
  },
  secondary: {
    background: "linear-gradient(-45deg, #22C55E, #4ADE80)", // skyblue
  },
  tertiary: {
    background: "linear-gradient(-45deg, #F97316, #FB923C)", // lightgreen
  },

  // サイズ
  small: { padding: "8px 24px", fontSize: "10px", borderRadius: "8px" },
  medium: { padding: "12px 32px", fontSize: "12px", borderRadius: "12px" },
  large: { padding: "16px 40px", fontSize: "14px", borderRadius: "14px" },

  // その他
  ripple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    animationName: rippleEffect,
    animationDuration: "0.6s",
    animationTimingFunction: "linear",
    background: "rgba(255, 255, 255, 0.2)",
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  spinner: {
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    width: "1.2em",
    height: "1.2em",
    animationName: spin,
    animationDuration: "0.8s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
});

interface Ripple {
  id: number;
  top: number;
  left: number;
  size: number;
}

interface Props {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  "aria-label"?: string;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  name,
  "aria-label": ariaLabel,
}: Props) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const isDisabled = disabled || loading;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const button = event.currentTarget;
    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    const newRipple: Ripple = {
      id: Date.now(),
      size,
      top: event.clientY - rect.top - size / 2,
      left: event.clientX - rect.left - size / 2,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== newRipple.id)
      );
    }, 600);

    if (onClick) {
      onClick(event);
    }
  };

  const buttonClassName = css.props(
    styles.button,
    styles[variant],
    styles[size]
  );

  return (
    <button
      name={name}
      className={buttonClassName}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={loading ? "読み込み中" : ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <div className={css.props(styles.spinner)} />
      ) : (
        <span className={css.props(styles.content)}>{children}</span>
      )}
      {!loading &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={css.props(styles.ripple)}
            style={{
              top: ripple.top,
              left: ripple.left,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
    </button>
  );
};
