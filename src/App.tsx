import axios from "axios";
import "./App.css";
import AppRouter from "./routers/AppRouter";

function App() {
  return <AppRouter />;
}

export default App;

// 백엔드 API URL (로컬에서 백엔드가 4000번 포트에서 실행되는 경우)
const apiUrl = "http://3.37.0.90:4000/api/demo"; // 따옴표 수정

axios
  .get(apiUrl)
  .then(response => {
    // eslint-disable-next-line no-console
    alert(JSON.stringify(response.data)); // 백엔드의 응답 데이터
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    alert("API 호출 실패:" + error); // 따옴표 수정
  });
