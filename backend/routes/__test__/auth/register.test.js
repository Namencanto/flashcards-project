import app from "../../../app";
import request from "supertest";
import Chance from "chance";
const chance = Chance();

describe("register", () => {
  const email = chance.email();
  const nick = chance.word();
  const password = chance.string({
    length: 30,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}|[]\\:\";'<>,.?/~`",
    special: true,
    numeric: true,
  });

  it("returns status code 200 if email and nick aren't duplicates, and all data passed ", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email,
      nick,
      password,
    });
    expect(res.statusCode).toEqual(200);

    expect(res.body).toMatchObject({
      id: expect.any(Number),
      email,
      nick,
    });
  });

  it("should return status code 409 if email or nick is already taken", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email,
      nick,
      password,
    });
    expect(res.statusCode).toEqual(409);
  });

  //

  it("should return status code 422 if the email is in the wrong pattern", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "wrong.pattern.pl",
      nick: "goodpattern",
      password: "GoodP4ttern!!!!!",
    });
    expect(res.statusCode).toEqual(422);
  });
  it("should return status code 422 if the password is in the wrong pattern", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "good@pattern.pl",
      nick: "goodpattern",
      password: "wrongpattern",
    });
    expect(res.statusCode).toEqual(422);
  });
  it("should return status code 422 if the nickname is in the wrong pattern", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "good@pattern.pl",
      nick: "wrongP4!!3RN",
      password: "GoodP4ttern!!!!!",
    });
    expect(res.statusCode).toEqual(422);
  });
});
