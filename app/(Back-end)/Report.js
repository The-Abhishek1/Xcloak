import path from "path"
import express from "express"

const app = express()

app.get("/report", (req, res) => {  

    const absPath = path.resolve("2025-04-19-ZAP-Report-.html")
  res.sendFile(absPath);
});

app.listen(1111, () => {
  console.log("Server is running on http://localhost:1111");
});
