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
    [ 페이드 효과 슬라이드 기능 정의 ]
    -> 슬라이드 순번에 대한 전역 변수를 사용한다!

    1. 오른쪽 버튼 클릭시 다음 순번 슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨 위로 설정해준다!(트랜지션 적용)
    -> 나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽 버튼은 이전 순번이 나오며 위와 동일

    3. 끝 번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번 표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 이벤트 설정 및 슬라이드 기능
******************************************/
function loadFn() {
  console.log("로딩 완료!");

  // 이동 버튼 대상 : .abtn
  const abtn = qsa(".abtn");
  // 변경 대상 : #slide
  let slide = qs("#slide");
  // 블릿 버튼 : .indic
  let indic = qs(".indic");
  // console.log(abtn,slide);

  // 슬라이드(블릿)개수 상수로 셋팅하기!
  // 상수는 대문자로 쓰고 단어 구분은 언더바로 함!
  const SLIDE_CNT = 5;

  // 슬라이드 트랜지션 시간 상수
  const SLIDE_TRANS_TIME = 600;

  // 광클 금지 변수
  let stop = false;

  // 슬라이드 순번 전역변수
  let snum = 0;

  ////////////// 초기 셋팅 //////////////

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
  // (1) 슬라이드의 li까지 수집! slide 변수
  slide = qsa("#slide li");
  // (2) 블릿의 li까지 수집! indic 변수
  indic = qsa(".indic li");

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
    // 광클 금지 설정 //////
    if (stop) return; // 막기!
    stop = true; // 잠금!
    setTimeout(() => {
      stop = false; // 해제!
    }, SLIDE_TRANS_TIME);
    ///////////////////////

    // 0. 인터발 지우기 함수 호출
    clearAuto();

    // 1. 오른쪽 버튼 여부
    let isRbtn = this.classList.contains("ab2");

    // 호출 확인
    // console.log('오른쪽 버튼이니?',isRbtn,this);

    // 2. 버튼에 따른 전역 슬라이드 번호 증감하기
    // (1) 오른쪽 버튼일 경우 증가
    //    -> 한계 설정: snum이 개수 -1과 같으면 첫 번호 0
    if (isRbtn) snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
    // (2) 왼쪽 버튼일 경우 감소
    //    -> 한계 설정: snum이 0보다 작으면 마지막 순번
    else snum === 0 ? (snum = SLIDE_CNT - 1) : snum--;

    console.log("snum:" + snum);

    // 3. 슬라이드 순번 클래스 제어 함수 호출하기
    setClass(slide, "on", snum);

    // 4. 블릿 순번 클래스 제어 함수 호출하기
    setClass(indic, "on", snum);

  } ////////////// goSlide 함수 //////////////
  //////////////////////////////////////////

  // 3. 클래스 제어 함수 만들기
  function setClass(target, className, seq) {
    // target - 변경할 요소 대상
    // className - 변경할 클래스명
    // seq - 클래스가 들어갈 순번

    // console.log("대상:", target, "/클래스명:", className, "/순번:", seq);

    // 1. target은 HTML 컬렉션이므로 forEach로 순회한다!
    target.forEach((ele, idx) => {
      // 1-1. seq와 idx가 일치할 경우 클래스 넣기
      if (seq === idx) ele.classList.add(className);
      // 1-2. 기타의 경우 클래스 제거하기
      else ele.classList.remove(className);
    }); ////// forEach //////
  } ////// setClass 함수 //////

  // [ 블릿 클릭 이벤트 셋팅 구역 ] //////////////
  // 대상: .indic li -> indic 변수
  // 1. 이벤트 설정하기
  indic.forEach((ele,idx)=>{ // ele - 요소 / idx - 순번
    addEvt(ele,'click',()=>indicSlide(idx));
  }); ////// forEach //////

  // 2. 이벤트 처리 함수 만들기
  function indicSlide(seq){ // seq - 변경할 순번
    console.log('블릿 클릭',seq);

    // 0. 인터발 지우기 함수 호출
    clearAuto();

    // 1.현재 블릿 순번으로 업데이트
    snum=seq;

    // 2.슬라이드 순번 클래스 제어 함수 호출
    setClass(slide, "on", snum);

    // 3.블릿 순번 클래스 제어 함수 호출
    setClass(indic, "on", snum);
  } ////// indicSlide 함수 //////


  // [ 자동 넘김 셋팅 구역 ] //////////////
  // 인터발용 변수 (지울 목적)
  let autoI;
  // 타임아웃용 변수 (지울 목적)
  let autoT;
  // 자동 넘김 호출 함수 최초 호출하기
  autoSlide();

  // [ 자동 넘김 호출 함수 ] //////////////
  function autoSlide() {
    // setInterval(함수,시간)
    // - 일정시간 간격으로 함수를 호출
    // clearInterval(인터발 변수)
    // - 변수에 담긴 인터발을 지움(멈춤)
    autoI = setInterval(() => {
      // 현재 슬라이드 순번 증가
      snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
      // 슬라이드 순번 제어 함수 호출
      setClass(slide, "on", snum);
      // 블릿 순번 제어 함수 호출
      setClass(indic, "on", snum);
    }, 3000);
  } ////////////// autoSlide 함수 //////////////
  /////////////////////////////////////////////

  /// [ 인터발 지우기 함수 : 버튼 조작시 호출함] //////////////
  function clearAuto() {
    // 지우기 확인!
    console.log("인터발 지워!");
    // 1.인터발 지우기
    clearInterval(autoI);

    // 2.타임아웃 지우기 : 실행 쓰나미 방지!!!
    clearTimeout(autoT);

    // 3.5초 후 아무 작동도 안 하면 다시 인터발 호출
    autoT = setTimeout(() => {
      autoSlide();
    }, 5000);
  } ////////// clearAuto 함수 ////////////


} ////////////// loadFn 함수 //////////////
//////////////////////////////////////////
