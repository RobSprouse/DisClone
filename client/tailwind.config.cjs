const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: {
          extend: {
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
          },
     },
     plugins: [require("tailwind-scrollbar")],
});
