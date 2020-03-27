require("ts-node").register(
  Object.assign(
    {
      ignore: [/\.js/]
    },
    require("../tsconfig.json")
  )
);

const entrypoint = process.argv[2];

require(entrypoint);
