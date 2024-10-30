const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, index) => !isIgnored[index]);
  return filteredFiles.join(" ");
};

module.exports = {
  "**/*.{js,jsx,ts,tsx}": async (files) => {
    const filteredFiles = await removeIgnoredFiles(files);

    return [
      `eslint --max-warnings=0 ${filteredFiles}`,
      `prettier -w ${filteredFiles.length > 0 ? filteredFiles : "."}`,
    ];
  },
  "**/*.{json,css,scss,md}": ["prettier -w"],
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit --incremental false",
  "package.json": ["sort-package-json"],
};
