const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: {
          size: ({ theme }) => ({
               "1/6": "16.666667%",
               profileImg: "9%",
          }),
          extend: {
               height: {
                    "sidebar": "84vh",
               },
               minHeight: {
                    "sidebar": "80rem",
                    "channelBar": "18rem",
                    "conversationBar": "18rem",
               },
               maxHeight: {
                    "channelBar": "35vh",
                    "conversationBar": "35vh",
               }
          },
     },
     plugins: [],
});
