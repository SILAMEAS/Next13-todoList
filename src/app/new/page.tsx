import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title : " + title);
  }
  // console.log(title);
  const res = await prisma.todo.create({
    data: { title: title, complete: false },
  });
  res && (await prisma.todo.findMany({})) && redirect("/");
}

export default function page() {
  return (
    <div className="flex flex-col items-start space-y-4">
      <h1 className=" text-3xl px-2">New</h1>
      <form action={createTodo} className="flex gap-2 flex-col w-[80%] mx-auto">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          placeholder="title"
        />
        <div className="flex justify-end items-center space-x-7">
          <Link href={"."}>Cancel</Link>

          <button
            type="submit"
            className="border border-slate-300 bg-blue-700 rounded px-2 py-1 outline-none focus-within:border-slate-100"
          >
            Submit
          </button>
        </div>
      </form>
      {/* <Link
        href="/"
        className="border border-slate-200 text-white px-2 py-1 rounded-md bg-red-700"
      >
        Back home
      </Link> */}
    </div>
  );
}
