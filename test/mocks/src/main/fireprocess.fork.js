if (!process.env.SILENT) {
  console.log(process.argv.slice(2)[0]);
  console.log(process.env.FOO);
}