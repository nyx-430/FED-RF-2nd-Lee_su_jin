// 오피니언 페이지 컴포넌트 ///
import { Fragment, useRef, useState } from "react";

// 사용자 기본 정보 생성 함수
import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본 데이터 JSON
import baseData from "../data/board.json";
// 리액트 웹팩에서 제이슨은 이름을 지어서 불러오면 된다!
// 제이슨 파일 처리는 다르므로 확장자를 반드시 써야 함!

// 제이쿼리
import $ from "jquery";

// CSS 불러오기
import "../../css/board.scss";
import "../../css/board_file.scss";

export default function Board() {
  /// [ 상태관리변수 ] ///
  // [1] 페이지 번호
  const [pageNum, setPageNum] = useState(1);

  /// [ 참조변수 ] ///
  // [1] 전체 개수 - 매번 계산하지 않도록 참조변수로!
  const totalCount = useRef(baseData.length);

  console.log("전체 개수:", totalCount);

  // 페이지당 개수
  const unitSize = 8;

  /********************************************* 
        함수명: bindList
        기능: 페이지별 리스트를 생성하여 바인딩함
    *********************************************/
  const bindList = () => {
    // console.log(baseData);

    // 1. 전체 원본 데이터 선택
    const orgData = baseData;

    // 2. 정렬 적용하기 : 내림차순
    orgData.sort((a, b) =>
      Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
    );

    // 3. 일부 데이터만 선택
    // 예시로 0번부터 9번까지만 선택
    // 한 페이지당 10개라면...
    // 페이지 번호와 연관시켜 본다!
    // 1, 2, 3, 4, ...
    // 시작번호 = (페이지 번호-1)*단위수
    let sNum = (pageNum - 1) * unitSize;

    // 끝번호 = 페이지 번호*단위수
    let eNum = pageNum * unitSize;

    const selData = [];
    for (let i = sNum; i < eNum; i++) {
      selData.push(orgData[i]);
    }
    console.log("일부 데이터:", selData);

    return selData.map((v, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>
          <a href="#" data-idx="51">
            {v.cont}
          </a>
        </td>
        <td>{v.uid}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; ////////// bindList //////////

  /********************************************* 
        함수명: pagingList
        기능: 게시판 리스트의 페이징 기능 목록
    *********************************************/
  const pagingList = () => {
    // 전체 페이징 개수: 전체 레코드 수/페이지당 개수
    // 유의점: 나머지가 있는지 검사해서 있으면 +1

    // 1. 페이징 개수
    let pagingCount = Math.floor(totalCount.current / unitSize);

    // 나머지가 있으면 다음 페이지가 필요함!
    // 나머지가 0이 아니라면 1 더하기
    if (totalCount.current % unitSize > 0) {
      pagingCount++;
    }

    console.log(
      "페이징 개수:",
      pagingCount,
      "나머지 개수:",
      totalCount.current % unitSize
    );

    // 링크 코드 만들기
    const pgCode = [];

    // 1부터 페이지 끝번호까지 돌면서 코드 만들기
    for (let i = 1; i <= pagingCount; i++) {
      pgCode.push(
        <Fragment key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPageNum(2);
            }}
          >
            2
          </a>
        </Fragment>
      );
    } /// for ///

    /// 코드 리턴 ///
    return pgCode;
  }; ////////// pagingList //////////

  //// 코드 리턴 구역 //////////////
  return (
    <>
      <main className="cont">
        <h1 className="tit">OPINION</h1>
        <div className="selbx">
          <select name="cta" id="cta" className="cta">
            <option value="tit">Title</option>
            <option value="cont">Contents</option>
            <option value="unm">Writer</option>
          </select>
          <select name="sel" id="sel" className="sel">
            <option value="0">Descending</option>
            <option value="1">Ascending</option>
          </select>
          <input id="stxt" type="text" maxLength="50" />
          <button className="sbtn">Search</button>
        </div>
        <table className="dtbl" id="board">
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Date</th>
              <th>Hits</th>
            </tr>
          </thead>
          <tbody>{bindList()}</tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="paging">
                {pagingList()}
              </td>
            </tr>
          </tfoot>
        </table>
        <br />
        <table className="dtbl btngrp">
          <tbody>
            <tr>
              <td>
                <button>
                  <a href="#">Write</a>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
} /////////// Board /////////////////////
