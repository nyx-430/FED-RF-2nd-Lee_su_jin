// 따라다니는 원 JS - following

// [1] 초기 셋팅하기 : html 넣기
// 1. 대상 : .cont-box
const contBox=document.querySelector('.cont-box');

// html코드 변수
let hcode="";

// 2. for문 돌려서 50개 div>img 넣기
for(let i=1;i<50;i++) {
    hcode += `
        <div>
            <img src="../images/dress/${i}.jpg" alt="dress">
            <a href="#" class="link">이것은 너의 드레스야!</a>
        </div>
        `;
} ////// for문 //////
// 정해진 숫자를 돌릴 때에는 for문

// 3. 코드 넣기
contBox.innerHTML=hcode;

// [2] 따라다니는 원 셋팅하기
// 1. 대상 선정
// 1-1. 움직일 대상 : .mover
const mover=document.querySelector('.mover');

// 1-2. 이벤트 대상 : body
const myBody=document.body;

// console.log('대상:',mover,myBody);

// 2. 이벤트 대상에 마우스무브 이벤트가 발생할 때
// mover가 마우스포인터 따라다니는 기능 구현

myBody.onmousemove=e=>{
    // console.log('마우스무브!!');
    // console.log('pageX:',e.pageX,'/pageY:',e.pageY);
    // console.log('screenX:',e.screenX,'/screenY:',e.screenY);
    // console.log('offsetX:',e.offsetX,'/offsetY:',e.offsetY);
    // console.log('clientX:',e.clientX,'/clientY:',e.clientY);

    // 1. 마우스 포인터 위치값 알아오기
    // event객체에 모두 셋업됨 -> e변수로 받음
    // e.pageX: X축 위치
    // e.pageY: Y축 위치

    // 2. mover에 위치값 적용하기
    // -> 무버에는 트랜지션 적용되어 있음
    mover.style.top=e.pageY+'px';
    // position: fixed이면 Y축을 보이는 화면 기준(clientY)으로 한다!
    // -> mover.style.top=e.clientY+'px';
    mover.style.left=e.pageX+'px';
    
}; /// mousemove /// 

// 3. 이벤트 대상 구역에 들어올 때만 보이기 / 나가면 숨기기
myBody.onmouseenter=()=>{
    mover.style.opacity=1;
}; /// mouseenter ///

myBody.onmouseleave=()=>{
    mover.style.opacity=0;
}; /// mouseleave ///

// 4. a요소에 오버시 원 커지게 하기
// 대상 : .link
const link=document.querySelectorAll('.link');

// console.log(link);

link.forEach((ele)=>{
    // a요소에 마우스 들어올 때
    ele.onmouseenter=()=>{
        mover.style.transform="translate(-50%, -50%) scale(2)";
    }; /// mouseenter ///
    
    // a요소에 마우스 나갈 때
    ele.onmouseleave=()=>{
        mover.style.transform="translate(-50%, -50%) scale(1)";
    }; /// mouseleave ///

}); /// forEach ///

/* 
★[[ 이벤트 발생시 위치값 ]]★

1. clientX, clientY
    -> 현재 보이는 브라우저 화면이 기준
    -> 화면을 기준한 fixed 포지션에서 주로 사용!

2. offsetX, offsetY
    -> 이벤트 대상이 기준
    -> 특정 박스이 부모 자격 박스로 부터 위치를 사용할 경우

3. pageX, pageY
    -> 전체 문서를 기준(스크롤 화면을 포함)
    -> 화면을 기준한 absolute 포지션에서 주로 사용!

4. screenX, screenY
    -> 모니터 화면을 기준
*/

    