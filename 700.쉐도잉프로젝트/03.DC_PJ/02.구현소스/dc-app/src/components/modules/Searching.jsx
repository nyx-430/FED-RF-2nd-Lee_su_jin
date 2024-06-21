import React, { useState } from "react";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// CSS불러오기
import "../../css/searching.scss";

// 데이터 불러오기 : 캐릭터 리스트 데이터
import { catListData } from "../data/swiper_cat";

// 캐릭터 리스트 결과 컴포넌트
import SearchingCat from "./SearchingCat";

function Searching({ kword }) {
  // kword - 전달 받은 키워드
  console.log("kword:", kword);
  console.log("data:", catListData);

  // 키워드에 따라 검색 결과가 달라지므로
  // 핵심 데이터인 검색어를 상태관리변수로 만든다!
  // ((상태관리변수)) //////////////
  // [1] 검색어 상태관리변수
  const [kw, setKw] = useState(kword);
  // 초기값으로 전달 받은 검색어 변수를 넣어준다!

  // [2] 정렬 기준 상태관리변수
  const [sort, setSort] = useState("asc");
  // 값: 오름차순 - asc / 내림차순 - desc

  // [3] 체크박스 체크 여부 상태관리변수
  const [chk, setChk] = useState([true, true, true]);
  // 배열로 만들고 체크박스 상태를 묶어서 관리한다!
  console.log("체크 HOOK 배열:", chk);

  // 검색어가 있는 데이터 필터하기
  // filter()는 검색 결과가 항상 배열로 나옴!
  const newList = catListData.filter((v) => {
    // 속성중 캐릭터 이름 중 검색(v.cname)
    // 검색어는 모두 영어일 경우 소문자 처리함
    let newVal = v.cname.toLocaleLowerCase();

    // 전달 받은 키워드도 소문자 처리
    // ((중요!!!)) 상태변수인 kw로 대체한다!!!
    let key = kw.toLocaleLowerCase();

    // 문자열이 있는 값만 배열로 재수집!
    if (
      // 1과 2의 조건이 모두 true여야 return함!
      // 1. 검색어 조건 (cname 속성)
      (newVal.indexOf(key) !== -1) &&

      // 2. 체크박스 항목 조건 (alignment 속성)
      // 주의: 조건문 내의 삼항연산자는 반드시 소괄호로 묶어서
      // 논리연산자(&&,||,!)와의 충돌을 막아줘야 함!
      // OR문의 결과가 false이러면 모두 false여야 함!
      // 체크박스 모두 불체크시 false로 처리!
      (
        (chk[0]?v.alignment=="hero":false) ||
        (chk[1]?v.alignment=="comp":false) ||
        (chk[2]?v.alignment=="villain":false)
      )
      // true && (false||false||false)
      // -> &&문은 모두 true여야 true
      // -> ||문은 하나만 true면 true
    ) return true;
    // 문자열.indexOf(문자) 문자열 위치 번호 리턴함
    // 그런데 결과가 없으면 -1을 리턴함!
    // 그래서 -1이 아닐 경우 true를 리턴하면
    // filter에서 변수에 저장할 배열로 수집된다!
  }); //////////////// filter ///////////////////

  // [ 결과내 재검색 : 데이터 항목 중 alignment값으로 검색함! ]

  // [ 정렬 기능 추가하기 ] /////////
  // (1) 오름차순일 경우
  if (sort == "asc") {
    newList.sort((a, b) =>
      a.cname > b.cname ? 1 : a.cname < b.cname ? -1 : 0
    );
  } /// if ///
  // (2) 내림차순일 경우
  else if (sort == "desc") {
    newList.sort((a, b) =>
      a.cname > b.cname ? -1 : a.cname < b.cname ? 1 : 0
    );
  } /// else if ///

  console.log("newList:", newList);

  /* 
        변수 = 배열.filter(v=>{
            if(v.속성명.indexOf(검색어)!=-1) return true
        })

        -> 결과는 검색어가 있는 경우 변수에 모아서 담아준다!
        -> 결과값도 배열, 결과가 없어도 빈 배열!
    */

  // 코드 리턴 구역 ////////////////////////
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션선택박스 */}
        <div className="schopt">
          {/* 1-1.검색박스 */}
          <div className="searching">
            {/* 검색버튼 돋보기 아이콘 */}
            <FontAwesomeIcon
              icon={faSearch}
              className="schbtn"
              title="Open search"
            />
            {/* 입력창 */}
            <input
              id="schin"
              type="text"
              placeholder="Filter by Keyword"
              defaultValue={kword}
              // 엔터키를 눌렀을 때 검색 실행!
              // 검색어 상태변수만 업데이트하면 끝!!!
              // -> setKw(검색어)
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  // 1. 검색어 상태값 변경
                  setKw(e.target.value);
                  // 2. 처음 검색시 정렬은 기본 정렬 오름차순(asc)
                  setSort("asc");
                  // 3. 정렬선택박스 선택값 변경 (DOM에서 보이기 변경)
                  document.querySelector("#sel").value = "asc";
                } /// if ///
              }}
            />
          </div>
          {/* 1-2. 체크박스구역 */}
          <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2>
                  ALIGNMENT
                  <span className="spbtn">＋</span>
                </h2>
                {/* 체크박스 리스트 */}
                <ol>
                  <li>
                    Heroes
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="hero"
                      className="chkhdn"
                      // 체크박스 체크 속성값을 HOOK 연결!
                      checked={chk[0]}
                      // 체크 변경시 change 이벤트 발생
                      onChange={(e) => {
                        // 체크박스의 checked 속성은 체크시 true, 불체크시 false 리턴
                        console.log(e.target.checked);

                        // HOOK 값 업데이트
                        setChk([e.target.checked, chk[1], chk[2]]);
                      }}
                    />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    It's Complicated
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="comp"
                      className="chkhdn"
                      // 체크박스 체크 속성값을 HOOK 연결!
                      checked={chk[1]}
                      // 체크 변경시 change 이벤트 발생
                      onChange={(e) => {
                        // 체크박스의 checked 속성은 체크시 true, 불체크시 false 리턴
                        console.log(e.target.checked);

                        // HOOK 값 업데이트
                        setChk([chk[0], e.target.checked, chk[2]]);
                      }}
                    />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                  <li>
                    Villains
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="villain"
                      className="chkhdn"
                      // 체크박스 체크 속성값을 HOOK 연결!
                      checked={chk[2]}
                      // 체크 변경시 change 이벤트 발생
                      onChange={(e) => {
                        // 체크박스의 checked 속성은 체크시 true, 불체크시 false 리턴
                        console.log(e.target.checked);

                        // HOOK 값 업데이트
                        setChk([chk[0], chk[1], e.target.checked]);
                      }}
                    />
                    {/* 디자인 노출 라벨 */}
                    <label htmlFor="villain" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        {/* 2. 결과리스트박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">BROWSE CHARACTERS</h2>
          {/* 2-2. 정렬선택박스 */}
          <aside className="sortbx">
            <select
              name="sel"
              id="sel"
              className="sel"
              // 값을 변경할 때 이벤트발생
              onChange={(e) => {
                console.log(e.target.value);
                // 정렬기준 상태변수 업데이트
                setSort(e.target.value);
              }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 : 
            데이터 상태변수 중 첫번째 값만 보냄 */}
          <SearchingCat dt={newList} />
        </div>
      </section>
    </>
  );
}

export default Searching;
