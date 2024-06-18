// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../data/gnb";

// 제이쿼리
import $ from "jquery";

// 상단영역 CSS 불러오기
import "../../css/top_area.scss";
import Logo from "../modules/Logo";

// 폰트어썸 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

  // 검색 관련 함수들 /////////////
  // 1. 검색창 보이기 함수
  const showSearch = (e)=>{
    // 기본 기능 막기
    e.preventDefault();

    // 1. 검색창 보이기
    $(".searchingGnb").show();
    // show() display를 보이게 하는 메서드

    // 2. 입력창에 포커스
    $("#schinGnb").focus();
  }; ///////// showSearch 함수 /////////

  // 2. 검색창에 엔터키 누르면 검색 함수 호출
  const enterKey = e => {
    // console.log(e.key,e.keyCode);
    // e.keyCode는 숫자, e.key문자로 리턴함

    if(e.key=="Enter"){
      // 입력창의 입력값 읽어오기 : val() 사용
      let txt = $(e.target).val().trim();
      console.log(txt);

      // 빈값이 아니면 검색 함수 호출 (검색어 전달!)
      if(txt!=''){
        // 입력창 비우고 부모박스 닫기
        $(e.target).val("").parents().hide();

        // 검색 보내기
        goSearch(txt);
      } /// if ///
    } /// if ///

  }; ///////// showSearch 함수 /////////

  // 3. 검색 페이지로 검색어와 함께 이동하기 함수
  const goSearch = txt => {
    console.log("나는 검색하러 간다규~!");
    // 라우터 이동 함수로 이동하기
    // 네비게이트메서드("라우터 주소",{state:{보낼 객체}})
    goNav("search",{state:{keyword:txt}})
  }; ///////// goSearch 함수 /////////

  // 코드 리턴 구역 //////////////
  return (
    <>
      {/* 1. 상단영역 */}
      <header className="top-area">
        {/* 로그인 환영메시지 박스 */}

        {/* 네비게이션 GNB파트 */}
        <nav className="gnb">
          <ul>
            {/* 1. 로고 컴포넌트 */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  // 기본 이동 막기
                  e.preventDefault();
                  // 페이지 라우터 이동 메서드 호출
                  goNav("");
                }}
              >
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
            {/* 3. 검색, 회원가입, 로그인 링크 */}
            <li
              style={{
                marginLeft: "auto",
                marginRight: "25px",
              }}
            >
              {/* 검색 입력 박스 */}
              <div className="searchingGnb">
                {/* 검색 버튼 돋보기 아이콘 */}
                <FontAwesomeIcon
                  icon={faSearch}
                  className="schbtnGnb"
                  title="Open search"
                />
                {/* 입력창 */}
                <input
                  type="text"
                  name="schinGnb"
                  id="schinGnb"
                  placeholder="Filter by Keyword"
                  onKeyUp={enterKey}
                />
              </div>
              {/* 검색 기능 링크 - 클릭시 검색창 보이기 */}
              <a href="#" onClick={showSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
} /////////// TopArea ///////////
