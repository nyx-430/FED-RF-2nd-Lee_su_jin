// 스타워즈 서브페이지 : Ahsoka 메인 JS - main.js

/* 상하단 공통 JS 불러오기 */
import comFn from "./common.js";
comFn();

// 나의 함수
import mFn from "./my_function.js";

// 데이터
import * as ahsokaData from "../data/sub_ahsoka_data.js";

// 스크롤 페이드인/아웃 ///////////////////////////
const stage = mFn.qsa(".page");
const scAct = mFn.qsa(".scAct");
// console.log("페이지:", stage, "\n scAct박스:", scAct);

const pagePos = [];
stage.forEach((ele, idx) => {
  pagePos[idx] = ele.offsetTop;
});
// console.log("페이지 높이값:", pagePos);

mFn.addEvt(window, "scroll", scrollFn);

const CRITERIA = (window.innerHeight / 3) * 2;

function scrollFn() {
  stage.forEach((ele, idx) => {
    // 대상의 BCR값 알아오기
    let pos = mFn.getBCR(ele);

    // console.log('스크롤~',pos);

    // 기준값보다 작아지면 on 넣기
    if (pos < CRITERIA) {
      scAct[idx].classList.add("on");
    } else {
      scAct[idx].classList.remove("on");
    }
  });
} ///////////// scrollFn /////////////

// 비디오 영역 아이프레임 src 변경 ///////////////////////////
const slidePeek = mFn.qsa(".slide-peek-box li");
const ifr = mFn.qs("#ifr");

// console.log("슬라이드 픽:", slidePeek, "\n 동영상:", ifr);

const movieId = {
  Trailer: "J_1EXWNETiI",
  "Masters and Apprentices": "UTqPkjk0GLU",
  Phenomenon: "dp-9AoWxchE",
  "cat": "uSqsyC780OY",
};

slidePeek.forEach((ele, idx) => {
  ele.onclick = () => {
    let txt = ele.querySelector("img").getAttribute("alt");
    // console.log("나 클릭!", ele);

    ifr.setAttribute(
      "src",
      `https://www.youtube.com/embed/${movieId[txt]}?autoplay=1`
    );

    forEach((x, i) => {
      if (i === idx) {
        x.parentElement.classList.add("on");
      } /// if ///
      else {
        x.parentElement.classList.remove("on");
      } /// else ///
    }); /// forEach ///
  }; /// onclick ///
}); ////// forEach //////

// 캐릭터 소개 영역 ///////////////////////////
(() => {
  const cBox = mFn.qs(".cbox");
  // console.log("캐릭터 박스:", cBox);

  let hcode = `<div class="col-12"><ul>`;

  ahsokaData.cData.forEach((v) => {
    hcode += `
    <li data-key="${v.idx}">
      <figure>
        <img src="./images/sub_ahsoka_images/characters/${v.idx}.jpeg" alt="${v.name}" />
      </figure>
      <div class="title-box">
        <h3>${v.name}</h3>
      </div>
    </li>
  `;
  }); /// forEach ///

  hcode += `</ul></div>`;
  cBox.innerHTML = hcode; 
})(); ///////////////////////////

// 캐릭터 소개 박스 나타나기 ///////////////////////////
const cPage = mFn.qs("#character-page");
const cPageTitle = mFn.qs("#character-page .title");
const cPageDesc = mFn.qs("#character-page .desc");
const cPageImg = mFn.qs("#character-page img");
console.log("캐릭터 페이지:", cPage);

const showBox = mFn.qsa(".cbox li");

showBox.forEach((x) => {
  x.onclick = () => {
    let key = x.getAttribute("data-key");
    // some() 메서드는 배열을 돌다가 조건에 맞으면 처리하고 나옴!
    let selRec = ahsokaData.cData.some((z) => {
      if (z.idx === key) { // 클릭된 idx와 일치하는 배열값을 찾음!
        cPageTitle.innerText = z.name;
        cPageDesc.innerText = z.desc;
        cPageImg.src = `./images/sub_ahsoka_images/characters/${z.idx}.jpeg`;
        return;
      }
    });
    console.log(key, ":", selRec);

    cPage.style.display = "block";
  }; /// onclick ///
}); ////// forEach //////

mFn.qs(".close-btn").onclick = () => {
  cPage.style.display = "none";
};

// 에피소드 가이드 영역 ///////////////////////////
(() => {
  const epBox = mFn.qs(".episode-box");
  // console.log("에피소드 박스:", epBox);

  let hcode = `<div class="slider-wrap"><ul>`;

  ahsokaData.epiData.forEach((v) => {
    hcode += `
      <li>
        <figure>
          <a href="#"
            ><img src="./images/sub_ahsoka_images/${v.idx}.jpeg" alt="${v.idx}"
          /></a>
        </figure>
        <div class="desc-box">
          <div class="title-box">
            <h3>${v.title}</h3>
            <p>${v.desc}</p>
          </div>
        </div>
      </li>
  `;
  }); /// forEach ///

  hcode += `</ul></div>`;
  epBox.innerHTML = hcode;
})(); ///////////////////////////
