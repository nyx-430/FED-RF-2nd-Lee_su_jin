// 가로방향 스크롤 구현 JS

// 1. 대상 요소 : html, body
const scTarget = $("html,body");

// 2. 스크롤 이벤트 설정 및 기능 구현하기
// 제이쿼리에서 전체 스크롤/휠 이벤트 작성시 대상은 항상 html, body 두개 모두 잡아준다
// 참고로 document나 window는 사용 안 됨!
// 이벤트 메서드: on(이벤트명,함수)

// 스크롤 위치값 변수
let scPos = 0;

let winW = $(window).width();
let pgCnt = $(".page").length;

// 최대한계값 : 전체 이동박스 크기 - 화면 가로 크기
let maxLimit = (winW*pgCnt) - winW;

console.log("window 크기:",winW,"/페이지 수:",pgCnt,"/최대한계값:",maxLimit);

scTarget.on("wheel",(e)=>{
    // 스크롤 이동을 위한 제이쿼리 속성
    // 1. scrollTop: 세로 스크롤바 위치
    // 2. scrollLeft: 가로 스크롤바 위치
    
    // scPos += 200;
    // scPos = scPos + 200;
    
    // 휠 방향 알아내기 (전체 이벤트 객체로부터 얻어옴)
    let delta = event.wheelDelta;

    if(delta < 0) scPos += 200;
    else scPos -= 200;

    // 한계값 체크
    // 최소한계 : 0
    if(scPos <= 0) scPos = 0;
    // 최대한계 : 전체 이동박스 크기 - 화면 가로 크기
    if(scPos >= maxLimit) scPos = maxLimit;
    
    console.log("스크롤 위치:",scPos,delta);

    // animate({CSS설정},시간,이징,함수)
    // stop() 메서드: 큐에 쌓인 애니메이션을 지움
    // 중간에 쌓인 애니를 지우고 최종 애니만 실행한다
    scTarget.stop().animate({scrollLeft: scPos+"px"},500)

    
}); /////////// wheel 이벤트 구역 ///////////