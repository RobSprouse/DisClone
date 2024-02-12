const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: {
          extend: {
               boxShadow: {
                    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
               },
<<<<<<< HEAD
               minHeight: {
                    "sidebar": "80rem",
                    "channelBar": "18rem",
                    "conversationBar": "18rem",
               },
               maxHeight: {
                    "channelBar": "35vh",
                    "conversationBar": "35vh",
               }
=======
               scrollbar: (theme) => ({
                    thin: {
                         width: "6px",
                         backgroundColor: "transparent",
                         thumbColor: theme("colors.gray.700"),
                         thumbHoverColor: theme("colors.gray.600"),
                         thumbRadius: "full",
                    },
               }),
>>>>>>> main
          },
     },
     plugins: [require("tailwind-scrollbar")],
});
