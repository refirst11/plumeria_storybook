import { css, rx } from "@plumeria/core";
import { useState, type ReactNode, type MouseEvent } from "react";
import { rippleEffect, spin } from "./animation";

const styles = css.create({
  content: {
    position: "relative",
    zIndex: 1,
  },
  button: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--padding)",
    overflow: "hidden",
    fontSize: "var(--font-size)",
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "pointer",
    background: "var(--bg-gradient)",
    border: "none",
    borderRadius: "var(--border-radius)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0 7px 10px rgba(0, 0, 0, 0.15)",
      filter: "brightness(0.95)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      filter: "brightness(0.9)",
      transform: "translateY(-1px) scale(0.98)",
    },
    "&:focus": {
      outline: "none",
    },
    "&[disabled]": {
      pointerEvents: "none",
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  ripple: {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    transform: "scale(0)",
    animationName: rippleEffect,
    animationDuration: "0.6s",
    animationTimingFunction: "linear",
  },
  spinner: {
    width: "1.2em",
    height: "1.2em",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animationName: spin,
    animationDuration: "0.8s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});

const variantStyles = {
  primary: { "--bg-gradient": "linear-gradient(-45deg, #0EA5E9, #38BDF8)" },
  secondary: { "--bg-gradient": "linear-gradient(-45deg, #22C55E, #4ADE80)" },
  tertiary: { "--bg-gradient": "linear-gradient(-45deg, #F97316, #FB923C)" },
};

const sizeStyles = {
  small: {
    "--padding": "8px 24px",
    "--font-size": "10px",
    "--border-radius": "8px",
  },
  medium: {
    "--padding": "12px 32px",
    "--font-size": "12px",
    "--border-radius": "12px",
  },
  large: {
    "--padding": "16px 40px",
    "--font-size": "14px",
    "--border-radius": "14px",
  },
};

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
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(button.clientWidth, button.clientHeight);

    const newRipple: Ripple = {
      top: event.clientY - rect.top - rippleSize / 2,
      left: event.clientX - rect.left - rippleSize / 2,
      id: Date.now(),
      size: rippleSize,
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

  return (
    <button
      {...rx(css.props(styles.button), {
        ...variantStyles[variant],
        ...sizeStyles[size],
      })}
      name={name}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={loading ? "...loading" : ariaLabel}
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
