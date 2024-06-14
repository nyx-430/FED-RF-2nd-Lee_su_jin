// 메인페이지 컨텐츠 컴포넌트 - MainCont.jsx

import React, { useEffect, useLayoutEffect } from "react";
import Banner from "../modules/Banner";

// 자동휠 함수 불러오기
import * as wFn from "../../js/func/auto_wheel";

function MainCont (props){

  // 화면 랜더링 실행 구역 //////////
  useEffect(()=>{
    console.log("useEffect");

    // document / body / window 이 세가지는
    // 이벤트를 등록하고 삭제할 수 있도록 여기서 이벤트를 걸어준다!
    window.addEventListener("wheel",wFn,wFn.wheelFn);

  },[]);
  // useLayoutEffect(()=>{
  //   console.log("useLayoutEffect");
  // },[]);

  // 코드 리턴 구역 //////////
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <section
        id="ban"
        className="page none-sel"
        style={{ background: "lightblue" }}
      >
        <Banner />
      </section>
      {/* 2. 남성패션 영역 */}
      <section className="page"></section>

      {/* 3. 여성패션 영역 */}
      <section className="page"></section>

      {/* 4. 스타일패션 영역 */}
      <section className="page"></section>

      {/* 메인에만 나오는 사이드 인디케이터 */}
      <nav className="indic">
        <ul>
          <li className="on">
            <a href="#ban">
              <span>배너</span>
            </a>
          </li>
          <li>
            <a href="#men">
              <span>남성의류</span>
            </a>
          </li>
          <li>
            <a href="#women">
              <span>여성의류</span>
            </a>
          </li>
          <li>
            <a href="#style">
              <span>스타일</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainCont;
