// CGV PJ 메인 페이지 JS - main.js

/***************************************** 
    [요구사항 분석]

    1. 영화 포스터 메뉴 클릭시 해당 예고편을
    메인 아이프레임에 상영되도록 아이디를
    매칭하여 src 속성을 변경해 준다.

    2. 이때 자동 재생 옵션을 추가하여
    src 변경시 바로 동영상이 재생되게 한다.

    3. 영상이 끝나면 다시 처음부터 재생되게
    옵션을 추가해 준다.
*****************************************/

// 1. 대상 선정
// 1-1. 이벤트 대상: .poster-menu a
const pMenu=document.querySelectorAll('.poster-menu a');
// 1-2. 변경 대상: #ifr
const ifr=document.querySelector('#ifr');

console.log('대상:',pMenu,ifr);

// 2. 영화 아이디 정보로 객체 구성하기
const movieId={
    "파묘":"rjW9E1BR_30",
    "웡카":"Bldf9SWRPFM",
    "이프 온리":"WGFapljXfnU",
    "소풍":"7VHsScXQyw0",
    "시민덕희":"w99yyjtYanE",
    "바튼 아카데미":"DNUF8Mt0svk"
}

// 3. 이벤트 속성 및 기능 구현
// 포스터 버튼에 forEach()메서드로 순회한다!
pMenu.forEach((ele,idx)=>{
    // ele는 각 a요소 / idx는 각 요소의 순번
        ele.onclick=()=>{
            // 클릭된 a요소를 구분하기 위해 하위 img 포스터의 alt 속성 읽어오기
            // 속성읽기 내장함수: getAttribute(속성명)
            let txt=ele.querySelector('img').getAttribute('alt');

        console.log('나 클릭!',ele);

        // 2. 아이프레임 src 변경하기
        // 속성 변경 JS 내장함수
        // setAttribute(속성명,값)
        // 대상: 아이프레임(#ifr->ifr변수)
        // 영화 아이디 값: movieId객체
        // 객체 호출법: movieId[영화 이름 속성명]
        // 영화 이름 속성명은 txt변수에 할당되어 있음
        // 객체 호출 코드: movieId[txt]
        ifr.setAttribute('src',
        `https://www.youtube.com/embed/${movieId[txt]}?autoplay=1`);

        // 3. 클릭된 a의 부모인 li에 클래스 on 넣기
        // forEach문 사용해보자!
        forEach((x,i) => { // x는 요소 / i는 순번
            // x.parentElementsms a요소 상위 부모 li요소
            if(i===idx){ // 해당 순번에서 on 넣기
                x.parentElement.classList.add("on");
            }
            else{ // 그밖에는 on 지우기
                x.parentElement.classList.remove("on");
            }
        }); ////// forEach //////

    }; ////// click //////

}); ////// forEach //////