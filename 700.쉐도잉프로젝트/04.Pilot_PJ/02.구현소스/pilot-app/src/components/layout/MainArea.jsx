import React from "react";

import MainCont from "../pages/MainCont";
import Fashion from "../pages/Fashion";



function MainArea({ page }) {
  // page 페이지 변경 문자값 전달
  // 4가지 값 : main / glist / man / woman / style

  // 코드 리턴 구역 //////
  return (
    <>
      {/* 조건 출력으로 페이지별 분기 */}
      {page == "main" && <MainCont />}
      {page == "fashion" && <Fashion />}
    </>
  );
}

export default MainArea;
