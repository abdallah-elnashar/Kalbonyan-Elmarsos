const chalk = require("chalk");
const { argv, demandOption } = require("yargs");
const yargs = require("yargs");
const notes = require("./notes");

// add
yargs.command({
  command: "add",
  describe: "add new note...",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    notes.addNote(argv.title, argv.body);
  },
});

//remove

yargs.command({
  command: "remove",
  describe: "remove new note...",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    notes.removeNote(argv.title);
  },
});

//list

yargs.command({
  command: "list",
  describe: "list new note...",

  handler: () => {
    notes.listNotes();
  },
});

//read

yargs.command({
  command: "read",
  describe: "read new note...",
  builder: {
    title: {
      describe: "read a note",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
