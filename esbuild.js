import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

let ctx = await esbuild.context({
    entryPoints: ["./views/main.tsx"],
    bundle: true,
    minify: true,
    outdir: "./public/js",
    plugins: [ sassPlugin({ type: "style", cache: false }) ]
});

await ctx.watch();

const { host, port } = await ctx.serve({ servedir: "./public/js" });
console.log(`EsBuild is runing on host: ${host}:${port}`);