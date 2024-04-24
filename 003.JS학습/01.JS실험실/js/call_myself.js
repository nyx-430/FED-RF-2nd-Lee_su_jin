// 08. 재귀호출 JS - call_myself.js

import mFn from "./my_function.js";

// 초기 셋팅하기
// 대상: .gbox
const gbox=mFn.qs(".gbox");

// 코드변수
let hcode="<ul>";

// for문으로 코드 만들기 : ul>li>img
for(let i=1; i<=7; i++) {
    hcode += `
        <li>
        <img src="./images/auto_scroll/m${i}.jpg" alt="갤러리이미지">
        </li>
    `;
} /// for ///

hcode += "</ul>";

// 대상에 코드 넣기
gbox.innerHTML=hcode;

// 갤러리 박스를 왼쪽으로 계속 움직이게 하는
// 재귀호출함수 만들기

// 움직일 대상: .gbox ul
let target = mFn.qsEl(gbox,'ul');

// 기준값 업데이트 함수
const updateCriteria = () => mFn.qsaEl(target,"li")[0].offsetWidth;

// 기준값 (대상 li의 가로 크기값)
let criteria = updateCriteria();

// 리사이즈 시 업데이트
mFn.addEvt(window,"resize",
()=>{criteria=updateCriteria();
    console.log('기준값 업데이트:',criteria);
});

// 현재 translate값
let currVal = 0;

function moveGallery(){
    // 현재값 1씩 감소
    target.style.translate = --currVal+"px";

    // 하나 크기만큼 나가면 맨 앞 li 맨 뒤로 이동!
    // 기준값을 마이너스로 하고 소수점 아래는 버림
    // Math.floor() 소수점 아래 내림(버림)함수
    // == 비교보다는 <=로 해야 안전함!
    if(currVal <= Math.floor(-criteria)){
        // 1. 맨 앞 li 맨 뒤로 이동!
        // apendChild(맨 앞 li)
        // -> 맨 앞 li는 새로 구해와야 함! (계속 변경되니까)
        target.appendChild(
            mFn.qsaEl(target,"li")[0]);

        // 2. translate값 초기화!
        target.style.translate = "0px";

        // 3. currVal값 초기화
        currVal = 0;

    } /// if ///

    // 하나 크기만큼 나가면 currVal값 초기화!


    // 재귀호출!
    // stopSts변수값이 false일 때만 실행하기
    if(!stopSts)
    setTimeout(moveGallery,10);
} //////////// moveGallery 함수 ////////////

// 대상에 마우스 오버시 멈추고, 아웃시 다시 흘러가게 하기
// 대상: .gbox -> gbox변수
// 1. 멈추기
let stopSts = false;
mFn.addEvt(gbox,"mouseenter",() => {
    // 멈춘 상태 변수 true 변경
    stopSts = true;
});

// 2. 다시 흘러가기
mFn.addEvt(gbox,"mouseleave",() => {
    // 멈춘 상태 변수 false 변경
    stopSts = false;

    // 재귀호출 함수 호출!
    moveGallery();
});

setTimeout(moveGallery,2000);

