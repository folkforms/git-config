const gitConfig = require("../src/gitConfig");

test("it runs", () => {
  gitConfig({});
  expect(1 + 1).toEqual(2);
});
