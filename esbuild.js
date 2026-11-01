const esbuild = require("esbuild");

const watch = process.argv.includes("--watch");

async function main() {
  const extCtx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    minify: false,
    sourcemap: true,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    external: ["vscode"],
    logLevel: "info",
  });

  const cliCtx = await esbuild.context({
    entryPoints: ["src/cli/trueforgeCli.ts"],
    bundle: true,
    format: "cjs",
    minify: false,
    sourcemap: false,
    platform: "node",
    outfile: "dist/trueforge-cli.js",
    logLevel: "info",
  });

  if (watch) {
    await Promise.all([extCtx.watch(), cliCtx.watch()]);
  } else {
    await Promise.all([extCtx.rebuild(), cliCtx.rebuild()]);
    await Promise.all([extCtx.dispose(), cliCtx.dispose()]);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

