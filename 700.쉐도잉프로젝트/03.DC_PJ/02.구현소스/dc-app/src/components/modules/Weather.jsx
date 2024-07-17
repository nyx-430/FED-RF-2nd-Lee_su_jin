import React, { Component } from "react";

// 날씨 CSS
import "../../css/weather.scss";

// 여기서는 컴포넌트를 class로 만들어 보자!
// 클래스는 컴포넌트는 기본적으로 Component 클래스를 상속받는다!
// extends 부모 클래스
class Weather extends Component {
  // 생성자 메서드는 호출하지 않아도 자동으로 호출됨
  // -> constructor(){}
  constructor(props) {
    // 부모에게 전달변수를 전달한다!
    // 부모 클래스는 super 키워드로!
    super(props);
    // 생성자함수 구역에 맴버변수 즉, 클래스 속성을
    // 만들면 이것이 상태변수가 된다!!
    // 클래스 내부 속성은 this키워드를 사용함!
    // 받아온 날씨 정보를 셋업할 객체임!
    // state 이름의 상태변수에 setState()로 셋팅함
    this.state = {
      // 1. 기온
      temp: "",
      // 2. 설명
      desc: "",
      // 3. 아이콘
      icon: "",
      // 4. 정보 로딩 여부
      loading: true,
      // 5. 도시명
      city: "",
    };
  } ////// 생성자 메서드 //////

  // 컴포넌트 생성 후 날씨 정보 조회하여 화면에 보이기
  // 함수형 컴포넌트에서는 랜더링 후는 useEffect()이지만
  // 클래스형은 componentDidMount() 메서드 사용함!

  // 참고) 함수형 컴포넌트의 후크인 useEffect()는
  // 클래스형 컴포넌트의 아래 3가지가 통합된 것이다!
  // (1) componentDidMount : 컴포넌트 생성 후
  // 후크 비교 -> useEffect(()=>{},[]) : 처음 한번만 실행
  // (2) componentDidUpdate : 컴포넌트 업데이트 후
  // 후크 비교 -> useEffect(()=>{}) : 매번 리랜더링 후 실행
  // (3) componentWillUnmount : 컴포넌트 소멸 후
  // 후크 비교 -> useEffect(()=>{return(()=>{})},[]) : 소멸자로 소멸 후 실행

  // 컴포넌트가 마운트 되었을 때 실행하는 메서드는?
  // -> componentDidMount(){}

  componentDidMount() {
    // [ 날씨 조회 정보 사이트 ]
    // https://openweathermap.org/

    // 1. 지정 도시명
    const cityName = "Seoul";
    // 2. 날씨 정보 조회 키 코드(로그인 사용자 키 복사)
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49";
    // 3. 날씨 정보 조회 url : 날씨 정보 제이슨이 날아온다!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // 브라우저에 검증
    // https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7fdf8fb74f3e2ed02bfb7e298a32df49

    // 소스 샘플
    // https://openweathermap.org/api/one-call-3

    /////////////////////////////////////////////
    // fetch() 함수를 이용한 데이터 조회하기! /////
    fetch(url) // 파일 받기
      .then((res) => res.json()) // json() 제이슨 파일 형식 파싱
      .then((wdata) => {
        //파일 파싱 후 내용 읽기
        console.log(wdata, wdata.main.temp);
        // 상태변수인 wInfo에 값을 셋팅한다!
        // 셋팅용 상태변수 메서드형은 setState()
        // this키워드 사용!
        this.setState({
          temp: wdata.main.temp,
          desc: wdata.weather[0].description,
          icon: wdata.weather[0].icon,
          loading: false, // 로딩 여부 끝(false)
          city: cityName,
        });
      }) /////// 마지막 then /////
      // 에러시 처리
      .catch((err) => console.log(err));
    /////////////////////////////////////////////
  } /// componentDidMount ///

  // 컴포넌트 결과 랜더링 메서드
  // render()
  render() {
    // 아이콘 정보
    const isrc = `https://openweathermap.com/img/w/${this.state.icon}.png`;

    // 로딩중 loading값이 true이면
    if (this.state.loading) {
      return <h4>Loading...</h4>;
    } /// if ////
    // 로딩 성공시 loading 값이 false이면
    else {
      /* 절대온도이므로 섭씨온도로 바꾼다!
                절대온도 - 273.15 뺀다!
                소수점도 한자리만 표시 */
      let ctemp = (parseInt(this.state.temp) - 273.15).toFixed(1);
      // toFixed(자릿수)

      return (
        <div className="weather-bx">
          <h4>Now Weather</h4>
          <h5>{this.state.city}</h5>
          <img src={isrc} alt="weather icon" />
          <p>{ctemp}℃</p>
          <p>{this.state.desc}</p>
        </div>
      );
    } /// else ////
  }
}

export default Weather;
