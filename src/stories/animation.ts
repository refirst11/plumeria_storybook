import { css } from "@plumeria/core";

export const rippleEffect = css.keyframes({
  to: {
    transform: "scale(4)",
    opacity: 0,
  },
});

export const spin = css.keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
