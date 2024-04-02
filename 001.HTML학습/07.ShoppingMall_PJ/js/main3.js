// 쇼핑몰 배너 JS - 03.페이드효과 //

// DOM 선택함수
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);

// addEvent 함수
// ele - 요소, evt - 이벤트, fn - 함수
const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window, "DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
******************************************/
function loadFn() {
  console.log("로딩완료!");

  // 이동 버튼 대상 : .abtn
  const abtn = qsa(".abtn");
  // 변경 대상 : #slide
  const slide = qs("#slide");
  // 블릿 버튼 : .indic
  let indic = qs(".indic");
  // console.log(abtn,slide);

  // 슬라이드(블릿)개수 상수로 셋팅하기!
  // 상수는 대문자로 쓰고 단어 구분은 언더바로 함!
  const SLIDE_CNT = 5;

  //////////// 초기 셋팅하기 ////////////
  // 5개의 슬라이드와 블릿을 만들어준다!
  for (let i = 0; i < SLIDE_CNT; i++) {
    // 슬라이드 넣기
    slide.innerHTML += `
    <li ${i === 0 ? 'class="on"' : "0"}>
        <img 
        src="images/slide0${i + 1}.jpg"
        alt="slide">
    </li>    
    `;
    // 블릿 넣기
    indic.innerHTML += `
    <li ${i === 0 ? 'class="on"' : ""}>
        <img src="images/dot1.png" alt="흰색">
        <img src="images/dot2.png" alt="회색">
    </li>
    `;
  } ////// for //////

  // li를 생성한 후 그 li 다시 수집한다!
  // 블릿의 li까지 수집! indic 변수
  indic = qs(".indic li");

  // 슬라이드 순번 전역변수
  let snum = 0;

  // 1. 이벤트 연결 설정하기 //////
  // 대상 : .abtn
  abtn.forEach((ele) => {
    addEvt(ele, "click", goSlide);
  }); // addEvt(대상,이벤트,함수)

  // 2. 이벤트 처리 함수 만들기 //////
  // 처리 순서
  // (1) 오른쪽 버튼이면 전역 슬라이드 변수 snum++
  // (2) 왼쪽 버튼이면 전역 슬라이드 변수 snum--
  // (3) 이때 한계값을 체크하여 순환되게 함
  //     -> 끝 번호 뒤는 첫 번호, 앞 번호 전은 끝 번호
  // (4) 해당 순번의 슬라이드에 클래스 on 넣기
  //     -> 나머지 슬라이드는 on 제거하기 (외부 함수 구성)
  // (5) 블릿 표시자도 슬라이드가 같은 순번에 클래스 on 넣고 나머지는 빼준다 (외부 함수 구성)
  // (6) 자동 넘김 구성 함수를 호출하여 인터발 호출 작동
  //     -> 버튼 클릭시 인터발 지우기, 일정 시간 뒤 다시 인터발 작동

  function goSlide() {
    // 1. 오른쪽 버튼 여부
    let isRbtn = this.classList.contains("ab2");

    // 호출 확인
    // console.log('오른쪽 버튼이니?',isRbtn,this);

    // 2. 버튼에 따른 전역 슬라이드 번호 증감하기
    // (1) 오른쪽 버튼일 경우 증가
    //    -> 한계 설정: snum이 개수 -1과 같으면 첫 번호 0
    if (isRbtn) snum === SLIDE_CNT-1 ? (snum = 0) : snum++;
    // (2) 왼쪽 버튼일 경우 감소
    //    -> 한계 설정: snum이 0보다 작으면 마지막 순번
    else snum === 0 ? (snum = SLIDE_CNT - 1) : snum--;

    console.log("snum:" + snum);
  } ////// goSlide //////
} ////////////// loadFn 함수 //////////////
//////////////////////////////////////////
