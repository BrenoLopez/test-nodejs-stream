import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Test",
  schema: "test",
  tableName: "test",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    a: {
      type: "varchar",
    },
    b: {
      type: "varchar",
    },
    c: {
      type: "varchar",
    },
    d: {
      type: "varchar",
    },
    e: {
      type: "varchar",
    },
    f: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      name: "created_at",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      name: "updated_at",
      updateDate: true,
    },
  },
});
