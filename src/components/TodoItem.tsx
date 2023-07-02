"use client";
import { RiDeleteBackLine } from "react-icons/ri";
type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  ToggleTodo: (id: string, complete: boolean) => void;
  DeleteTodo: (id: string) => any;
};
export default function TodoItem({
  id,
  title,
  complete,
  ToggleTodo,
  DeleteTodo,
}: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <button className="ml-5" onClick={() => DeleteTodo(id)}>
        <RiDeleteBackLine />
      </button>
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => ToggleTodo(id, e.target.checked)}
      />
      <label htmlFor={id} className="peer-checked:line-through">
        {title}
      </label>
    </li>
  );
}
