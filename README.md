# Require Override Problem Demo

This is intended to be viewed in VSCode. Open it in VSCode and try running
the two debug configurations.

When launching with the workspace as the cwd, the script in `cli/` is successfully
able to execute `lib/index.tsx`.

However, when launching from `lib/` as the cwd, the same `require` call causes
a syntax error when trying to parse `lib/index.tsx`.

The problem seems to be caused by the presence of the `.babelrc` file in the cwd. I'm still
trying to figure out how to mitigate it.

See the `js-only` branch for an experiment in removing Typescript from the mix.
When Typescript and ts-node are removed, the require *always* fails! This suggests
that the ts-node loader might be responsible for loading the file in the manner
required, and that its loader is short-circuted or overridden or not used when
a .babelrc file is present in the cwd.

## Solution

The solution is to add
```
  dir: __dirname
```
to the tsconfig passed to `require("ts-node").register`.
