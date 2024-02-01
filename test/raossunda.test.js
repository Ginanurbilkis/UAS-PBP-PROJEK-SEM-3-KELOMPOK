import {
  createTestRaossunda,
  createTestUser,
  getTestRaossunda,
  removeAllTestRaossundas,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { updateRaossundaValidation } from "../src/validation/raossunda-validation.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/raossunda", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestRaossundas();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/raossunda")
      .set("Authorization", "test")
      .send({
        makanan: "ayam bakar",
        minuman: "jus mangga ",
        paket_murah: "paket keluarga 1",
        jumlah: "0809000",
        harga: "0000000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@pzn.com");
    expect(result.body.data.phone).toBe("08090000000");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/raossunda")
      .set("Authorization", "test")
      .send({
        makanan: "",
        minuman: "jus ",
        paket_murah: "test",
        jumlah: "08090000000",
        harga: "00000000000",
      });

    expect(result.status).toBe(400);
    expect(result.body.console.errors).toBeDefined();
  });
});

describe("GET /api/raossunda/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestRaossundas();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(Web)
      .get("/apo/raossunda/" + getTestContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should retrun 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(Web)
      .get("/apo/raossunda/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/raossunda/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestRaossundas();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("api/raossunda/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "firman",
        last_name: "anugrah",
        email: "firman@pnz.com",
        phone: "8999999",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("firman");
    expect(result.body.data.last_name).toBe("anugrah");
    expect(result.body.data.email).toBe("firman@pnz.com");
    expect(result.body.data.phone).toBe("999999");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("api/raossunda/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("api/raossunda/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "firman",
        last_name: "anugrah",
        email: "firman@pnz.com",
        phone: "8999999",
      });

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/raossunda/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestRaossundas();
    await removeTestUser();
  });

  it("should can delete raossunda", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("api/raossunda/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should reject if contact is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("api/raossunda/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/raossunda", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestRaossundas();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/raossunda")
      .set("/Aouthorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/raossunda")
      .query({
        page: 2
      })
      .set("/Aouthorization", "test");

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(5);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/raossunda")
      .query({
        name: "test 1"
      })
      .set("/Aouthorization", "test");

      logger.info(result.body);
      
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/raossunda")
      .query({
        email: "test 1"
      })
      .set("/Aouthorization", "test");

      logger.info(result.body);
      
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/raossunda")
      .query({
        phone: "234234"

      })
      .set("/Aouthorization", "test");

      logger.info(result.body);
      
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });
});
