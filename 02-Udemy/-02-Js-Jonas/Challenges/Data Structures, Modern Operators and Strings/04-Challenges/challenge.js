document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  for (const row of rows) {
    const [first, last] = row.toLowerCase().trim().split("_");
    const output = `${first}${last.replace(last[0], last[0].toUpperCase())}`;
    console.log(`${output.padEnd(20)}`);
  }
});
