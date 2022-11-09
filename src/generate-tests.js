import { randomUUID } from "node:crypto";
import { dataSource } from "./data-source.js";
(async () => {
  const repository = dataSource.getRepository("Test");
  for (let index = 0; index < 5e5; index++) {
    const object = Object.fromEntries(
      Object.keys({ a: "", b: "", c: "", d: "", e: "", f: "" }).map((key) => [
        key,
        randomUUID(),
      ])
    );
    await repository.save(object);
  }
  console.log("terminated");
})();
