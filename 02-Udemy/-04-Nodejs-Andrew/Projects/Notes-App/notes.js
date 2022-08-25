const chalk = require("chalk");

const fs = require("fs");

const getNotes = () => {
  return "your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
  } else {
    console.log("note is taken");
  }

  saveNotes(notes);
};

const removeNote = function (title) {
  const notes = loadNotes();

  const newNotes = notes.filter((note) => note.title !== title);

  if (newNotes.length === notes.length) {
    console.log(chalk.inverse.red("no note found"));
  } else {
    console.log(chalk.inverse.green("note is removed"));
    saveNotes(newNotes);
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.bold("your notes..."));

  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();

  const notesToRead = notes.find((note) => note.title === title);

  if (notesToRead) {
    console.log(chalk.inverse.green(notesToRead.title));
    console.log(notesToRead.body);
  } else {
    console.log(chalk.inverse.red("error"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
