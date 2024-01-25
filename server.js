// Create an application in ExpressJS, NodeJS and Angular.

// 1. Express App which starts a server and listens on port 8081 for connection.

// 2. Backend - Read the data from source excel in NodeJS and send to Front end.

// 3. Frontend - Use the data to plot the similar chart as shown in excel.

// 4. Give options to download the chart in PDF and source data in excel.

// You can use your ideas to enhance the UI by adding more components.

const express = require("express");
const PORT = 8081;
const fileUpload = require("express-fileupload");
const xlsx = require("xlsx");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send({ message: "No files uploaded" });
  }

  const file = req.files.file;
  const workbook = xlsx.read(file.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
