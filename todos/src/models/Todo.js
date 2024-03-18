export class Todo {
  id;
  task;
  done;
  priority;

  constructor(id, task, done, priority) {
    this.id = id;
    this.task = task;
    this.done = done;
    this.priority = priority;
  }
}
