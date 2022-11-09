import { totalmem } from "node:os";
import csvWriter from "csv-write-stream";
import { dataSource } from "./data-source.js";
import { pipeline, Readable } from "node:stream";

export const generageCsv2 = async (res) => {
  const x = 1024 ** 3;
  console.log(
    `total memory allocated: ${parseFloat(
      (process.memoryUsage().heapTotal / x).toFixed(3)
    ).toFixed(2)} GB\ntotal memory: ${parseFloat(totalmem() / x).toFixed(2)} GB`
  );
  const repository = dataSource.getRepository("Test");
  const readbleTests = await repository
    .createQueryBuilder()
    .limit(300000)
    .stream();

  // TESTE NÃO FUNCIONA
  // const tests = await repository.find({ take: 300000 });
  // const readbleTests = Readable.from(tests);

  console.log(
    `used memory: ${(process.memoryUsage().heapUsed / x).toFixed(3)} GB\n`,
    `memory allocation: ${(process.memoryUsage().heapTotal / x).toFixed(3)}`
  );
  const writer = csvWriter();
  console.log(
    `used memory: ${(process.memoryUsage().heapUsed / x).toFixed(3)} GB\n`,
    `memory allocation: ${(process.memoryUsage().heapTotal / x).toFixed(3)}`
  );
  res.writeHead(200, {
    "Content-disposition": "attachment;filename=out.csv",
    "Content-Type": "text/csv",
  });
  return pipeline(readbleTests, writer, (err) => {
    if (err) {
      console.error("Pipeline failed", err);
    } else {
      console.log("Pipeline succeeded");
    }
  });
  //autocannon -c 2 -w 10 -t 120 -d 120 localhost:3000/solution
};
