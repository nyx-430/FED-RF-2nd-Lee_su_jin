// 보그 PJ 아이템 페이지 JS - items.js

// 상단 영역 불러오기
import TopArea from "./components/TopArea";

// 아이템 영역 불러오기
import ItemsArea from "./components/ItemsArea";

// 하단 영역 불러오기
import FooterArea from "./components/FooterArea";

// [1] 아이템 페이지 전체 레이아웃 로딩 컴포넌트
function Layout() {
  // 코드 리턴 구역
  return (
    <React.Fragment>
      {/* 1. 상단 영역 컴포넌트 */}
      <TopArea />
      {/* 2. 아이템 영역 컴포넌트 */}
      <ItemsArea catName="living" />
      {/* 3. 하단 영역 컴포넌트 */}
      <FooterArea />
    </React.Fragment>
  );
} ///////////// Layout 컴포넌트 /////////////

// [2] 상단 영역 서브 컴포넌트
// ReactDOM.render(<TopArea />, document.querySelector("#top-area"));

// [3] 메인 영역 서브 컴포넌트
// ReactDOM.render(<MainArea />, document.querySelector("#main-area"));

// [4] 하단 영역 서브 컴포넌트
// ReactDOM.render(<FooterArea />, document.querySelector("#footer-area"));

// 메인 페이지 전체 출력하기
ReactDOM.render(<Layout />, document.querySelector("#root"));
