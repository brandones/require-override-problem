# Require Override Problem Demo

This is intended to be viewed in VSCode. Open it in VSCode and try running
the two debug configurations.

When launching with the workspace as the cwd, the script in `cli/` is successfully
able to extract the contents of `lib/index.tsx`.

However, when launching from `lib/` as the cwd, the same `require` call causes
a syntax error when trying to parse `lib/index.tsx`.

The problem is caused by the presence of the `.babelrc` file in the cwd. I'm still
trying to figure out how to mitigate it.

