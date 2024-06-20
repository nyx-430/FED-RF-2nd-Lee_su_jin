// Pilot PJ 전체 메뉴 컴포넌트

import { useState } from "react";
import { pCon } from "./pCon";

export function TotalMenu() {
  // 컨텍스트 사용하기
  const myCon = useState(pCon);

  // 서브페이지 이동함수
  const goSub = (e) => {
    // 1. 기본 이동 막기
    e.preventDefault();

    // 2. 이동할 서브페이지 명 : a요소의 글자를 소문자로!
    let pgName = e.target.innerText.toLowerCase();
    console.log(pgName);

    // 3. 서브페이지 이동을 위한 상태변수 업데이트
    myCon.setPgName("men");

    // 4. 햄버거버튼 클릭 이벤트 발생하여 전체 메뉴 닫기
    document.querySelector(".ham").click();
  }; ////////// goSub //////////

  // 코드 리턴 //////////////////////
  return (
    <>
      <div className="mbox">
        <video
          src="./images/disc2018.mp4"
          loop="loop"
          muted="muted"
          className="bgm"
        ></video>
        <nav className="mlist">
          <dl>
            <dt>
              <a href="#" onClick={goSub}>
                MEN
              </a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#">WOMEN</a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#">STYLE</a>
            </dt>
            <dd>
              <a href="#">COLLECTION</a>
            </dd>
            <dd>
              <a href="#">SEASON AD</a>
            </dd>
            <dd>
              <a href="#">STAR &amp; NEWS</a>
            </dd>
            <dd>
              <a href="#">MAIN ITEM</a>
            </dd>
          </dl>
        </nav>
      </div>
    </>
  );
} ///////// TotalMenu 컴포넌트 //////////
