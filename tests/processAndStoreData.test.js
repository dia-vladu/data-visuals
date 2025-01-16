const { processAndStoreData } = require("../javascript/fetchData.js");

describe("processAndStoreData", () => {
  it("correctly processes and stores data", () => {
    const indicator = "GDP";
    const data = [1000, 2000, 3000, 4000, 5000, 6000];
    const years = [2020, 2021];
    const countries = ["RO", "FR", "DE"];
    let objects = [];

    processAndStoreData(indicator, data, years, countries, objects);

    expect(objects.length).toBe(6);
    expect(objects[1]).toEqual({
      country: "RO",
      year: 2021,
      indicator: "GDP",
      value: 2000,
    });
  });

});
