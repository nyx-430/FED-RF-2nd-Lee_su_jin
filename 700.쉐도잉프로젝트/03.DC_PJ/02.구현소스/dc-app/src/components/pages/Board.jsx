// 오피니언 페이지 컴포넌트 ///

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
    // 끝번호 = 페이지 번호*단위수

    // 페이지 번호
    const pgNum = 1;

    // 페이지당 개수
    const unitSize = 10;

    const selData = [];
    for ( // 시작값
        let i = (pgNum - 1) * unitSize;
        // 한계값
        i < pgNum * unitSize; 
        // 증감
        i++) {
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
                <b>1</b> | <a href="#">2</a> | <a href="#">3</a> |{" "}
                <a href="#">4</a> | <a href="#">5</a> | <a href="#">6</a> |{" "}
                <a href="#">7</a> | <a href="#">8</a>
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
