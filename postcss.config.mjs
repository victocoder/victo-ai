const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        brain: "glow 2s ease-in-out infinite",
        pulse: "pulse-animation 1.5s infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 2px #a78bfa)" },
          "50%": { filter: "drop-shadow(0 0 8px #a78bfa)" },
        },
        "pulse-animation": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
};

export default config;
