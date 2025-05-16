const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        brain: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 2px #a78bfa)" },
          "50%": { filter: "drop-shadow(0 0 8px #a78bfa)" },
        },
      },
    },
  },
};

export default config;
