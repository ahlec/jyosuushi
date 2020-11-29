const del = require("del");
const { dest, series, src } = require("gulp");
const gulpTypescript = require("gulp-typescript");

const tsProject = gulpTypescript.createProject("tsconfig.server.json", {
  typescript: require("ttypescript"),
});

function cleanServer() {
  return del("dist-server");
}

function transpileServer() {
  return src(["src/**/*.ts", "!src/client/**/*"])
    .pipe(tsProject())
    .pipe(dest("dist-server"));
}

function copyServerGql() {
  return src(["src/**/*.graphql", "!src/client/**/*"]).pipe(
    dest("dist-server")
  );
}

exports["build-server"] = series(
  // Clean output directory
  cleanServer,
  // Transpile TypeScript
  transpileServer,
  // Copy GraphQL documents to output
  copyServerGql
);
