const whitelist = ["http://localhost:5000", "mongodb+srv://Bhavana:Bhavana@123@cluster0.vmake.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export { corsOptions };
