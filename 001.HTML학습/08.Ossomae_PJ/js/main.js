// 옷소매 갤러리 JS - main.js

import mFn from "./my_function.js";

/*************************************************************** 
    1. 기능정의: 버튼 클릭시 갤러리박스를 잘라서 앞/뒤로 이동함

    1-1. 오른쪽버튼 클릭시 - 맨앞div 맨뒤로 이동
    -> 갤러리부모박스.appendChild(맨앞자식div)

    1-2. 왼쪽버튼 클릭시 - 맨뒤div 맨앞으로 이동
    -> 갤러리부모박스.insertBefore(맨뒤자식div,맨앞자식div)
 ***************************************************************/

// 1. 대상 선정
// 1-1. 이벤트 대상: .abtn (이동버튼)
const abtn = mFn.qsa(".abtn");

// 1-2. 변경 대상: .gbx (갤러리 부모박스)
const gbx = mFn.qs(".gbx");

console.log(abtn, gbx);

// 2. 이벤트 설정
abtn.forEach(ele => {
  mFn.addEvt(ele, "click", changeSlide);
}); /// forEach ///

// 3. 변수 설정
// 광클금지 변수 (true면 금지, false는 허용)
let stopClick = false;

// 애니 시간(잠금 시간)
const TIME_SLIDE = 400;

// 4. 함수 만들기
// 갤러리 이동하기 함수
function changeSlide() {
    // 광클금지
    if(stopClick) return;
    stopClick = true;
    setTimeout(()=>stopClick=false, TIME_SLIDE);

  // 1. 버튼 구분하기
  let isR = this.classList.contains("rb");
  // classList.contains(클래스명) - 해당 클래스명이면 true

  console.log("나야 나~!", isR);

  // 2. 이동 대상 변수 할당
  let eachOne = mFn.qsaEl(gbx, "div");

  // 2. 분기하기
  // 2-1. 오른쪽 버튼일 경우
  if (isR) {
    // 오른쪽에서 이미지박스가 들어오므로
    // 맨앞 div가 맨뒤로 이동함!
    // appendChild(맨앞 div)
    // 대상: gbx
    gbx.appendChild(eachOne[0]);
  } /// if ///
  // 2-2. 왼쪽 버튼일 경우
  else {
    // 왼쪽에서 이미지박스가 들어오므로
    // 맨뒤 div가 맨앞으로 이동함!
    // insertBefore(맨뒤 div, 맨앞 div)
    // 대상: gbx
    gbx.insertBefore(eachOne[eachOne.length - 1], eachOne[0]);
    // 맨뒤 div 순번은 [개수 - 1]
  } /// else ///
} ////////// changeSlide /////////


// 자동넘김용 호출함수 /////////////////
// 오른쪽 이동 함수
const goRight = () => gbx.appendChild(mFn.qsaEl(gbx, "div")[0]);

// 자동넘김용 변수
// (인터발용: autoI, 타임아웃용: autoT)
let autoI, autoT;

// 인터발 호출 함수
const autoSlide = () => autoI = setInterval(goRight,3000);

// 인터발 함수 최초 호출
autoSlide();

// 인터발 함수 지우기 함수
const clearAuto = () => {
  // 인터발 지우기
  clearAuto(autoI);

  // 타임아웃 지우기
  clearTimeout(autoT);
  autoT = setTimeout(autoSlide,5000);

}; //////// clearAuto 함수 ////////

// 버튼 클릭시 clearAuto 호출
abtn.forEach(ele=>mFn.addEvt(ele,"click",clearAuto));