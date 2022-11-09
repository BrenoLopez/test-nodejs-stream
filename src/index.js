import { freemem, totalmem } from "node:os";
import csvWriter from "csv-write-stream";
import testEntity from "./test.entity.js";
import { dataSource } from "./data-source.js";
import { Readable } from "node:stream";

export const generageCsv = async () => {
  const x = 1024 ** 3;
  console.log(
    `free memory: ${parseFloat(freemem() / x).toFixed(
      2
    )} GB\ntotal memory: ${parseFloat(totalmem() / x).toFixed(2)} GB`
  );
  const repository = dataSource.getRepository("Test");
  const tests = await repository.find({ take: 300000 });
  console.log(tests.length);
  console.log(
    `used memory: ${(process.memoryUsage().heapUsed / x).toFixed(3)} GB\n`,
    `memory allocation: ${(process.memoryUsage().heapTotal / x).toFixed(3)} GB`
  );
  const writer = csvWriter();
  const readbleTests = Readable.from(tests);
  readbleTests.on("data", (chunk) => {
    writer.write(chunk);
  });
  readbleTests.on("end", () => {
    writer.end();
    console.log(
      `used memory: ${(process.memoryUsage().heapUsed / x).toFixed(3)} GB\n`,
      `memory allocation: ${(process.memoryUsage().heapTotal / x).toFixed(3)}`
    );
  });

  // functiona
  // artillery quick --count 5 --num 2 http://localhost:3000/

  // apresenta estouro de memoria
  // artillery quick --count 10 --num 2 http://localhost:3000/

  return writer;
};
