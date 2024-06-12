// 03. 메모이제이션 : useMemo

function App() {
  // 점수 관련 상태변수
  const [score, setScore] = React.useState(0);

  // 국적 관련 상태변수
  const [isKor, setIsKor] = React.useState(true);

  // 국적 표시 객체
  const nara = {
    country: isKor ? "한국" : "일본"
  };

  // 랜더링 상태관리 후크 useEffect 설정
  // nara객체는 isKor에 의존하고 있음
  // 따라서 isKor이 변경되면 nara가 변경됨!
  React.useEffect(() => {
    console.log("nara가 변경됨!");

    // 축구선수 이미지 중 해당 나라 이미지가 위로 올라옴
    $("img").eq(isKor?1:0) // isKor이 true면 손흥민이 1번
    .animate({botton: "+=50px"},300);
    // bottom 기존값에 50px씩 중첩해서 더함!
  }, [nara]);

  // 코드 리턴 구역 //////////////
  return (
    <header className="header" style={{ textAlign: "center" }}>
      <h1>
        한국과 일본이 축구를 하고 있습니다!
        <br />
        {isKor ? "한국이" : "일본이"}몇점 차로 승리를 예측합니까?
      </h1>
      {/* 점수입력창 */}
      <input
        type="number"
        value={score}
        onChange={(e)=>setScore(e.target.value)}
        style={{
          fontSize: "40px",
          textAlign: "center",
        }}
      />

      <hr />

      <h1>당신은 어느 나라 사람입니까?</h1>
      <h2 style={{ fontSize: "40px" }}>{nara.country}사람</h2>
      {/* 국적 변경 버튼 */}
      <button 
      onClick={() => {
        // 한국사람 여부 변수(isKor) 반대로 넣기
        setIsKor(!isKor);
        // 국적 변경시 예상 점수차 초기화 하기
        setScore(0);
      }}
      style={{ fontSize: "40px" }}>국적변경하기</button>
      {/* 다나카 */}
      <img
        src="https://i.namu.wiki/i/fNSwm2U4hvUad455bOoiJsczNZDdOmZ3Kl7qUkCGzdMt7ckJB-LRnO7PXPUjWF7ADTuYS9vaTZKsnSNajizvWw.webp"
        style={{
          height: "300px",
          position: "fixed",
          bottom: "-100px",
          left: "5vw",
          borderRadius: "50%",
          border: "10px double lightblue",
        }}
      />
      {/* 손흥민 */}
      <img
        src="https://image.kmib.co.kr/online_image/2021/0105/202101050405_12120924172594_1.jpg"
        style={{
          height: "300px",
          position: "fixed",
          bottom: "-100px",
          right: "5vw",
          borderRadius: "50%",
          border: "10px double orangered",
        }}
      />
    </header>
  );
} //////////// App 컴포넌트 ////////////

// 리액트 루트객체 생성
const root = ReactDOM.createRoot(document.getElementById("root"));

// 화면 랜더링
root.render(<App />);