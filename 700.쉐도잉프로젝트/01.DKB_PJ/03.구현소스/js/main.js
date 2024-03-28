// DKB_PJ JS - main.js

// 모듈로 호출된 JS에서 다른 외부 JS를 import로 호출 가능!
// import하려는 파일에서 반드시 함수, 변수 등을 export해야 함!

import slideFn from "./slide.js";

console.log('모듈로 메인 JS 호출!',document.querySelector('.top-menu'));

// slideFn 함수 호출
slideFn();