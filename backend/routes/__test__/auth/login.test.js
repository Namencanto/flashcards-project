import app from "../../../app";
import request from "supertest";

describe("login", () => {
  it("returns status code 200 if email and nick passed ", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "T3st@test.com",
    });
    expect(res.statusCode).toEqual(200);

    console.log(res.body);
    // expect(res.body).toMatchObject({
    //   id: 40,
    //   email: "test@test.com",
    //   password: "T3st@test.com",
    // });
  });

  it("should return status code 404 if email or password aren't in db", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "empty@empty.com",
      password: "3Mpty#mpty",
    });
    expect(res.statusCode).toEqual(404);
  });
});
