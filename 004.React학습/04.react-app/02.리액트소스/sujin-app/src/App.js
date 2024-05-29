import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    $(".App-header span").hover( // 호버시
      (e)=>{
      $(e.currentTarget).stop().animate(
        {scale: 1.4}
        ,500);
  },
      (e)=>{ // 아웃시
      $(e.currentTarget).animate(
        {scale: 1}
        ,500);
  })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <img src="https://asiacatexpo.com/wp-content/uploads/2020/12/red-white-cat-i-white-studio2-768x646.png"
          className="App-logo" alt="logo" />
        </span>
        <p>
          이제 리액트는 내 겁니다.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
