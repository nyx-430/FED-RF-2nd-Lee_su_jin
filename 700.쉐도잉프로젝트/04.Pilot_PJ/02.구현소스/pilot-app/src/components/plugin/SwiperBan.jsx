// 스와이퍼 플러그인 컴포넌트

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./css/swiper_ban.scss";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 페이지네이션,네비게이션,자동넘김)
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

export function SwiperBan({ cat }) {
  // cat - 카테고리명
  console.log("배너 카테고리명:", cat);

  // 스와이퍼 객체를 담기 위한 참조변수
  const swpObj = useRef(null);

  // 화면 랜더링 구역 /////////////////////
  useEffect(() => {
    // 스와이퍼 배너 첫 페이지로 이동하기
    // 스와이퍼 객체
    let objSwp = swpObj.current.swiper;
    // 스와이퍼 페이지 이동 메서드: slide(순번,시간)
    objSwp.slideTo(0, 0);
    // 첫번째 슬라이드는 0번, 애니 시간은 0으로 안 보이게

    // 스와이퍼 객체는 어디 있지?
    console.log("랜더링:", swpObj);
    console.log("Swiper:", swpObj.current.swiper);
    // 플러그인 스와이퍼 컴포넌트 객체 생성시
    // ref속성에 useRef변수를 넣으면 거기에 스와이퍼 객체가 담겨진다!
    // -> 외부에서 사용 가능!!!
    // 사용법:
    // (1) 요소로 사용할 때 : 참조변수.current
    // (2) 객체로 사용할 때 : 참조변수.current.swiper
    // 참고) ref속성에 useRef변수를 사용한 객체 사용법은
    // 다른 컴포넌트에서도 사용할 수 있는 방법이다!
  }); //////////// useEffect ////////////

  // 리스트 만들기 함수 ////
  const makeList = (num) => {
    // num
    let temp = [];
    for (let x = 0; x < num; x++) {
      temp[x] = (
        <SwiperSlide key={x}>
          {(cat == "men" || cat == "women") && x == 0 ? (
            <video
              src={"./images/sub/" + cat + "/banner/mv.mp4"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              //   muted
              // loop -> 루프는 동영상 멈춤 이벤트 체크시 주석
              className={cat + "-vid"}
              //   autoPlay
            />
          ) : (
            <img
              src={"./images/sub/" + cat + "/banner/ban" + (x + 1) + ".png"}
            />
          )}
        </SwiperSlide>
      );
    } /////////// for /////////////

    // 배열을 리턴
    return temp;
  }; ///////////// makeList 함수 //////////

  // 리턴 코드 ///////////////////
  return (
    <>
      <Swiper
        ref={swpObj}
        /* ref 속성에 useRef 할당변수를 넣어서 외부에 연결함 */
        onInit={(swp) => {
          console.log("스와이퍼 처음 셋팅!", swp);
        }}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        // -> 자동 플레이는 코딩으로 대체!
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        loop={true}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        // 슬라읻 이동 후 실행 코드 구역
        onSlideChange={(swp) => {
          // swp는 내부로 전달되는 스와이퍼 자신 객체
          // activeIndex는 loop시 오류 있음
          // realIndex는 loop에도 잘 나옴!

          // style에는 없으므로 여기서 리턴
          if (cat == "style") {
            // 영상 플레이 자동 넘김 끄기
            swp.autoplay.stop();
            // 자동 넘김 false 전환
            swp.autoplay.running = false;
            return;
          }

          let mvEle = document.querySelector(`.${cat}-vid`);

          // 현재 진짜 순번
          let idx = swp.realIndex;

          console.log("슬라이드 순번:", idx);

          // men / women일 때 첫 페이지 영상 플레이
          if (idx == 0) {
            // 영상 플레이 자동 넘김 끄기
            swp.autoplay.stop();
            // 자동 넘김 false 전환
            swp.autoplay.running = false;

            // 영상 플레이 작동
            mvEle.play();

            // 비디오 재생시 발생 이벤트 체크
            // timeupdate: 비디오 재생 이벤트
            mvEle.addEventListener("timeupdate", (e) => {
              // 비디오가 멈추면 멈춤 속성값이 true임
              // 멈춤 속성 -> paused
              console.log("비디오 재생중~~", e.target.paused);
              // 비디오가 멈추면 슬라이드 이동
              if (e.target.paused) {
                swp.slideNext();
                // 자동 넘김 시작
                swp.autoplay.start();
                // 자동 넘김 true 전환
                swp.autoplay.running = true;
              } /// if ///
            }); ////// timeupdate //////
          } /// if ///
          // 기타 페이지는 영상 멈춤
          else {
            mvEle.pause();
          } /// else ///
        }}
      >
        {makeList(cat == "style" ? 5 : 3)}
      </Swiper>
    </>
  );
} /////////// SwiperBan 컴포넌트 ///////////
