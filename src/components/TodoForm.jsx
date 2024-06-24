import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const ApiKey = "http://localhost:4000/todos"


const addTodo = async (newTodo) => {
  const res = await axios.post(ApiKey + "/todos", newTodo)
  return res.data
}

export default function TodoForm({ fetchData }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient()

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    }
  })

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");


   const newTodo = {
    id: Data.now().toString(),
    title,
    contents,
    isCompleted: false,
    createdAt: Data.now()
   }

   mutation.mutate(newTodo)

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
}
