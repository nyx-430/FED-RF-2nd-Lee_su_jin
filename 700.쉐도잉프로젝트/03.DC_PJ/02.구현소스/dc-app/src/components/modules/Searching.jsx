import React from "react";

// 폰트어썸 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// CSS 불러오기
import "../../css/searching.scss";

// 데이터 불러오기
import { catListData } from "../data/swiper_cat";

// 캐릭터 리스트 결과 불러오기
import SearchingCat from "./SearchingCat";

function Searching({ kword }) {
  // kword - 전달 받은 키워드

  // 코드 리턴 구역 ////////////////////////
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션 선택 박스 */}
        <div className="schopt">
          {/* 1-1. 검색 박스 */}
          <div className="searching">
            {/* 검색 버튼 돋보기 아이콘 */}
            <FontAwesomeIcon
              icon={faSearch}
              className="schbtn"
              title="Open search"
            />
            {/* 입력창 */}
            <input id="schin" type="text" placeholder="Filter by Keyword" />
          </div>
          {/* 1-2. 체크 박스 구역 */}
          <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2>
                  ALIGNMENT
                  <span className="spbtn">＋</span>
                </h2>
                {/* 체크 박스 리스트 */}
                <ol>
                  <li>
                    Heroes
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="hero" className="chkhdn" />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    It's Complicated
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="comp" className="chkhdn" />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                  <li>
                    Villains
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="villain" className="chkhdn" />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="villain" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        {/* 2. 결과 리스트 박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">BROWSE CHARACTERS</h2>
          {/* 2-2. 정렬 선택 박스 */}
          <aside className="sortbx">
            <select name="sel" id="sel" className="sel">
              <option value="0">A-Z</option>
              <option value="1">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 : 
            데이터 상태변수 중 첫번째 값만 보냄 */}
          <SearchingCat />
        </div>
      </section>
    </>
  );
}

export default Searching;
