import app from "../../../app";
import request from "supertest";
import Chance from "chance";
const chance = Chance();

import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
beforeAll(() => {
  dotenv.config({
    path: path.resolve(__dirname, "../../../../.env.test.local"),
  });
});
describe("nick change", () => {
  const nick = chance.word();
  it("returns status code 200 nick is valid and passed", async () => {
    const res = await request(app)
      .post("/api/users/nick")
      .set("jwt", `${process.env.TEST_JWT}`)
      .send({
        nick,
      });
    expect(res.statusCode).toEqual(200);

    // expect(res.body).toMatchObject({
    //   id: 40,
    //   email: "test@test.com",
    //   password: "T3st@test.com",
    // });
  });

  it("should return status code 422 if nick is invalid", async () => {
    const res = await request(app)
      .post("/api/users/nick")
      .set("jwt", `${process.env.TEST_JWT}`)
      .send({
        nick: "$I3M4",
      });
    expect(res.statusCode).toEqual(422);
  });
});
