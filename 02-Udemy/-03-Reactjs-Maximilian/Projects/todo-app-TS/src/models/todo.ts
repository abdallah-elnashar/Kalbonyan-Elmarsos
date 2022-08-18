class Todo {
  text: string;
  id: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = `${Math.random()}`;
  }
}

export default Todo;
