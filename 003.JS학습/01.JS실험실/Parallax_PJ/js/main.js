// 패럴렉스 PJ JS - main.js

// 부드러운 스크롤 불러오기
import { startSS, setPos } from "./smoothScroll20.js";

// DOM함수 불러오기
import mFn from "./my_function.js";

// 부드러운 스크롤 호출
startSS();

/******************************************** 
    [ 패럴렉스 기능 구현하기 ]
    1. 정의 : 패럴렉스란 스크롤 작동시 같은 방향으로
    요소가 다른 속도를 가지고 움직임으로
    사용자가 공간감을 느낄 수 있게 하는 구현 방법

    2. 방법 : 
        (1) 범위 - 요소가 화면에 등장하여
        보일 동안 스크롤 될 때 이동함
        (2) 움직일 크기 설정이 필요함
        (3) 범위 체크를 위한 JS 메서드를 사용함
        -> getBoundingClientRect().top

    3. 이벤트 : scroll
    4. 패럴렉스 대상 : 특정 클래스 지정
        (1) 글자박스 대상 : .txt
        (2) 아이콘 이미지 대상 : .icon

********************************************/

// 0. 새로 고치면 스크롤바 위치캐싱 후 맨위로 이동
setTimeout(() => {
  // 윈도우 스크롤 맨위로!
  window.scrollTo(0, 0);
  // 부드러운 스크롤 위치값 반영!
  setPos(0);
  // 안 하면 원래 위치로 스크롤시 튐!
}, 400);
// 0. 스크롤바 트랙을 잡고 위치 이동시 위치값 반영
mFn.addEvt(window, "mouseup", () => setPos(window.scrollY));
// -> 부드러운 스크롤 때문에 셋팅함
/////////// mouseup ///////////

// 0. 키보드 방향키 이동시 위치값 반영
mFn.addEvt(window, "keyup", () => setPos(window.scrollY));
/////////// mouseup ///////////

// 1. 대상 선정 ///////////////
// 1-1. 글자박스
const txtBox = mFn.qsa(".txt");
// 1-2. 아이콘박스
const icon = mFn.qsa(".icon");

// console.log(txtBox,icon);

// 2. 이벤트 설정하기 ////////////
// 대상: window / 이벤트 종류: scroll
mFn.addEvt(window, "scroll", scrollFn);

// 3. 함수 만들기 ////////////////
// 3-1. 스크롤 이벤트 함수 ////
function scrollFn() {
  // console.log('스크롤~~~!');

  // 1. 대상1 : 글자박스 패럴렉스 호출!
  txtBox.forEach(ele=>moveEl(mFn.getBCR(ele),ele,setH2));
  
  // 2. 대상2 : 아이콘 패럴렉스 호출!
  icon.forEach(ele=>moveEl(mFn.getBCR(ele),ele,setH1));
  
} /////////// scrollFn 함수 ///////////

// 셋팅값 변수 ////
// 윈도우 높이값
const winH = window.innerHeight;
// 패럴렉스 범위변수
const setH1 = 200,
  setH2 = 300;

  // 첫번째 패럴렉스 대상이 이미 화면에 올라와 있어서
  // 초기값 계산하여 위치 조정하기
  moveEl(mFn.getBCR(txtBox[0]),txtBox[0],setH2);
  moveEl(mFn.getBCR(icon[0]),icon[0],setH2);

// 3-2. 패럴렉스 이동함수 /////
function moveEl(elPos, ele, setH) {
  // 전달변수 :
  // (1) elPos - 위치값(getBCL값)
  // (2) ele - 대상요소(패럴렉스 대상)
  // (3) setH - 움직일 범위 수 (클수록 빠르게 이동)
  // console.log(
      // '위치:',elPos,
      // '\n대상:',ele,
      // '\n범위:',setH);

  // [ 패럴렉스 범위 : 윈도우 높이값 ~ 0 ]
  // 화면에서 완전히 사라질 때 범위는 0보다 작다 (약간의 마이너스값)
  if(elPos < winH && elPos > 0){
    // 1. 위치 이동값 계산
    let x = setH - ((elPos * setH) / winH)
    // -(정한범위 - 실제이동값) -> 0부터 증가함!
    // 실제이동값 = 위치값*정한범위 / 전체범위
    // 실제 이동값은 정한 범위에서 빼주고 마이너스를 준다!

    // 2. 해당 요소의 위치값 이동 CSS에 반영하기
    ele.style.transform = `translateY(${-x}px)`;
  } /// if ///
  

  /********************************************* 
    [ 패럴렉스 위치 계산 ]
    1. 전체 범위 : 윈도우 높이값
    2. 위치값 : getBoundingClientRect().top
    3. 정한 범위 : 이동할 수치
    4. 실제 이동값 : transform:translateY(이동수치px)
    _____________________________________________

    ((비례식으로 실제 이동값 알아내기))
    전체범위 : 위치값 = 정한범위 : 실제이동값
    실제이동값 = 위치값*정한범위 / 전체범위

    -> 그.런.데...
    Y축 위치 이동은 처음에 0부터 서서히 커지므로
    이동수치값은 정한 범위에서 실제 이동값을 빼야함!

    실제이동값 = 정한범위 - (위치값*정한범위 / 전체범위)

  *********************************************/
} ////////// moveEl 함수 //////////
