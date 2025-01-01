type Todo = {
  id: number;
  title: string;
  active: boolean;
};
type TodoList = Record<number, Todo>;
