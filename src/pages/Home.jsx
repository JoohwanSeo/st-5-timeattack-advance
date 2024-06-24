import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ApiKey = "http://localhost:4000/todos"

const fetchTodos = async () => {
    const res = await axios.get(ApiKey + '/todos')
    return res.data
  }

export default function Home() {

const {data, error, isLoading} = useQuery('todos',fetchTodos )

//   // TODO: useQuery 로 리팩터링 하세요.
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await todoApi.get("/todos");
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트</h2>
      <TodoForm fetchData={fetchData} />
      <TodoList todos={data} />
    </>
  );


}


