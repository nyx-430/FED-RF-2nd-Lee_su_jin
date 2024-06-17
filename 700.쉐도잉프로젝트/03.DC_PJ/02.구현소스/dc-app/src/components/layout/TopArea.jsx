// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../data/gnb";

// 상단영역 CSS 불러오기
import "../../css/top_area.scss";
import Logo from "../modules/Logo";

export default function TopArea() {
  // 이동 함수
  const goNav = useNavigate();
  // 사용시 goNav(라우터주소,{전달객체})
  // 전달객체 없으면 비워놓음
  // 사용법: 반드시 useNavigate()메서드를 변수에 담아
  // 이동할 라우터 주소를 쓰면 이동한다
  // 예) goNav('/News') - News 페이지 이동
  // 예) goNav('/nEws') - News 페이지 이동
  // 예) goNav('/') - 첫 페이지로 이동
  // 예) goNav('') - 첫 페이지로 이동
  // 이동 주소는 대소문자 구분 안 함!
  // 슬래쉬(/) 없어도 루트로 인식함
  // -> 빈값이면 루트로 이동함!

  // 코드 리턴 구역 //////////////
  return (
    <>
      {/* 1.상단영역 */}
      <header className="top-area">
        {/* 로그인 환영메시지 박스 */}

        {/* 네비게이션 GNB파트 */}
        <nav className="gnb">
          <ul>
            {/* 1. 로고 컴포넌트 */}
            <li>
              <a href="#" onClick={(e) => {
                // 기본 이동 막기
                e.preventDefault();
                // 페이지 라우터 이동 메서드 호출
                goNav("/")}}>
                <Logo logoStyle="top" />
              </a>
              {/* <Link to="/">
                <Logo logoStyle="top" />
              </Link> */}
            </li>
            {/* 2. GNB메뉴 데이터 배열로 만들기 */}
            {menu.map((v, i) => (
              <li key={i}>
                {
                  // 하위 메뉴가 있으면 일반 a요소에 출력
                  // 없으면 Link 라우팅 출력
                  v.sub ? (
                    <a href="#">{v.txt}</a>
                  ) : (
                    <Link to={v.link}>{v.txt}</Link>
                  )
                }
                {
                  // 서브 메뉴 데이터가 있으면 하위 그리기
                  v.sub && (
                    <div className="smenu">
                      <ol>
                        {v.sub.map((v, i) => (
                          <li key={i}>
                            <Link to={v.link}>{v.txt}</Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )
                }
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
} /////////// TopArea ///////////
