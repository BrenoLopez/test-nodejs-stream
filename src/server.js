import express from "express";
import { generageCsv } from "./index.js";
import { dataSource } from "./data-source.js";
import { generageCsv2 } from "./solution.js";
import { pipeline } from "node:stream";
const app = express();

try {
  await dataSource.initialize();
  console.log(`connected`);
} catch (error) {
  console.log(error);
}
app.get("/", async (req, res) => {
  const writer = await generageCsv();
  res.writeHead(200, {
    "Content-disposition": "attachment;filename=out.csv",
    "Content-Type": "text/csv",
  });
  writer.pipe(res);
  return;
});

app.get("/solution", async (req, res) => {
  const writer = await generageCsv2(res);
  pipeline(writer, res, (err) => {
    if (err) {
      console.error("Pipeline failed", err);
    } else {
      console.log("Pipeline succeeded");
    }
  });
  return;
});
app.listen(3000, () => console.log("Server is running"));
