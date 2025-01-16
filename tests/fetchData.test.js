const { buildString, fetchData } = require("../javascript/fetchData.js");
const { baseUrl } = require("../javascript/constants/constants.js");

// Mock the module that exports baseUrl
jest.mock("../javascript/constants/constants.js", () => ({
  baseUrl: "https://example.com/data/",
}));

global.fetch = jest.fn();

describe("fetchData", () => {
  beforeEach(() => {
    global.fetch.mockClear(); //Reset mock before each test
  });

  it("fetches data successfully", async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ value: { key1: 100, key2: 200 } }),
    });

    // Test inputs
    const countries = ["US", "FR"];
    const years = [2020];
    const indicator = "GDP";

    // Expected URL
    const stringCountries = buildString("&geo", countries);
    const stringYears = buildString("&time", years);
    const expectedUrl = `${baseUrl}${indicator}${stringCountries}${stringYears}`;

    const result = await fetchData(countries, years, indicator);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: "get" });
    expect(result).toEqual([100, 200]);
  });

  it("handles fetch failure gracefully", async () => {
    // Mock fetch to return an error
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error("Network error")));

    const result = await fetchData(["RO"], [2020], "GDP");

    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
