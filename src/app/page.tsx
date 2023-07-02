import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
const allTodo = () => {
  return prisma.todo.findMany({});
};
const deleteAllTodo = () => {
  return prisma.todo.deleteMany({});
};
const createManyTodo = () => {
  return prisma.todo.createMany({
    data: [
      { title: "Coca", complete: false },
      { title: "String", complete: false },
    ],
  });
};
async function ToggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}
async function DeleteTodo(id: string) {
  "use server";
  console.log("DELETE");
  return await prisma.todo.delete({
    where: { id },
  });
}

export default async function Home() {
  // await deleteAllTodo();
  const todoList = await allTodo();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl  px-2">Todo list</h1>
        <Link
          href="/new"
          className="border border-slate-200 text-slate-300 px-2 py-1 rounded-md bg-green-900"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col mt-10 space-y-3">
        {todoList.length <= 0 ? (
          <p>No data</p>
        ) : (
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              ToggleTodo={ToggleTodo}
              DeleteTodo={DeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
