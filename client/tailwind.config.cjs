const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require("tailwindcss/plugin");

module.exports = withMT({
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: {
          
          colors: {
               sky: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                    950: "#082f49",
               },
               slate: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                    950: "#020617",
               },
         

          },
          extend: {
               textShadow: {
                    sm: '0 1px 2px var(--tw-shadow-color)',
                    DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                    lg: '0 8px 16px var(--tw-shadow-color)',
               },
               boxShadow: {
                    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
               },
               
               scrollbar: (theme) => ({
                    thin: {
                         width: "6px",
                         backgroundColor: "transparent",
                         thumbColor: theme("colors.gray.700"),
                         thumbHoverColor: theme("colors.gray.600"),
                         thumbRadius: "full",
                    },
               }),
               fontFamily: {
                    'PressStart2P': ['"Press Start 2P"'],
          },
          
         
          },
     },
     
     plugins: [require("tailwind-scrollbar"),
          plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
              {
                'text-shadow': (value) => ({
                  textShadow: value,
                }),
              },
              { values: theme('textShadow') }
            )
          }),
     ],
     
});
