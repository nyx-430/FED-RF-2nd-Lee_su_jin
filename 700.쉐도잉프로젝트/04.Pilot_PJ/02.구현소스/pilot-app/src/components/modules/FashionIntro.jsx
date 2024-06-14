import React from "react";

// 데이터 불러오기
import { fsData } from "../../js/data/fashion_intro";

// CSS 불러오기
import "../../css/fashionIntro.scss";

function FashionIntro({ catName, subCat, opt }) {
  // catName - 카테고리 명
  // subCat - 서브 카테고리 명
  // (서브가 아닌 경우 subCat의 값은 "etc"임!)
  // opt - 방향 옵션 (역방향은 true / 정방향은 false)
  // (역방향은 flex-direction: row-reverse 적용)

  // 선택 데이터 변수 할당
  const selData = fsData[catName];

  return (
    <div id={catName} className="fs-page">
      <ul
        className="pgc"
        // 정방향, 역방향 적용 코드
        style={{ flexDirection: opt ? "row-reverse" : "row" }}
      >
        {/* 1. 첫번째 이미지박스 */}
        <li className="imgc">
          <img src={selData.isrc[0]} alt={selData.ialt[0]} />
        </li>
        {/* 2. 두번째 글자박스 */}
        <li className="txtc">
          <h2 className={catName == "style" ? "tm" : ""}>
            {/* (참고) 데이터에 태그가 있어서 이를 html에 넣으려면
            dangerouslySetInnerHTML={{__html:데이터}} 속성을 사용한다 */}
            <a href="#">
              {selData.tit[0][0]}
              <br />
              {selData.tit[0][1]}
            </a>
          </h2>
          {
            // 스타일인 경우 글자박스 하나 더 출력됨
            catName == "style" && (
              <h2 className="tw">
                <a href="#">
                  {selData.tit[1][0]}
                  <br />
                  {selData.tit[1][1]}
                </a>
              </h2>
            )
          }
        </li>
        {/* 3. 세번째 이미지박스 : 스타일만 */}
        {
          // 스타일인 경우 li 이미지박스 출력
          catName == "style" && (
            <li className="imgc">
                <img src={selData.isrc[1]} alt={selData.ialt[1]} />
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default FashionIntro;
