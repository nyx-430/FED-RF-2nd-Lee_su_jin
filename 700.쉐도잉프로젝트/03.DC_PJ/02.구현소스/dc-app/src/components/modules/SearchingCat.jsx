// DC PJ 캐릭터 검색결과 리스트 컴포넌트
import React from "react";

// CSS 불러오기
import "../../css/searching_cat.scss";

// 라우터돔 Link
import { Link } from "react-router-dom";

function SearchingCat({ dt }) {
  // dt - 검색된 배열데이터

  // total - 검색된 배열데이터 개수
  const total = dt.length;
  console.log("데이터수:",total);

  return (
    <>
      {
        // 데이터 개수가 0이 아닐 때 출력
        total > 0 && (
          <ul className="clist">
            {dt.map((v, i) => (
              <li key={i}>
                <Link
                  to="/detail"
                  /* state로 3가지 값을 넘겨준다! */
                  state={{
                    cname: v.cname, // 캐릭터 이름
                    cdesc: v.cdesc, // 캐릭터 설명
                    facts: v.facts, // 캐릭터 상세
                  }}
                >
                  <img src={v.tmsrc} alt={v.cname} />
                  <h3>{v.cname}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
      {
        // 선택데이터가 0개이면 아래 출력
        total == 0 && (
          <h2 style={{ textAlign: "center" }}>
            Sorry, we don't have any matches for that. But there's plenty more
            to see on DC!
          </h2>
        )
      }
    </>
  );
}

export default SearchingCat;
