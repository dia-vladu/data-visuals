const { buildString } = require("../javascript/fetchData.js");

describe("buildString", () => {
  it("builds a query string from a prefix and an array of items", () => {
    const prefix = "&geo";
    const items = ["FR", "DE", "RO"];
    const result = buildString(prefix, items);
    expect(result).toBe("&geo=FR&geo=DE&geo=RO");
  });

  it("returns an empty string for an empty array", () => {
    const result = buildString("&geo", []);
    expect(result).toBe("");
  });

  it("handles a single item array correctly", () => {
    const result = buildString("&geo", ["FR"]);
    expect(result).toBe("&geo=FR");
  });
});