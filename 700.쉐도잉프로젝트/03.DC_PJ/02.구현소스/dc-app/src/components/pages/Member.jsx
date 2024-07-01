import React, { useState } from "react";
import { Link } from "react-router-dom";

// 회원가입 CSS 불러오기
import "../../css/member.scss";

function Member(props) {
  // [ 회원가입 페이지 요구사항 ]
  // 1. 각 입력 항목별로 유효성 검사를 실행함
  // 2. 상태 체크를 통하여 적절한 유효성 검사시 유효성 체크를 에러 메시지로 출력한다
  // 3. 유효성 검사 통과시 로컬스에 저장한다
  // -> 특이사항: 글자를 입력할 때마다 검사 + submit 버튼 작동시 검사

  // [ 상태관리변수 ]
  // [1] 입력요소 상태변수
  // 1. 아이디 변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호 변수
  const [pwd, setPwd] = useState("");
  // 3. 비밀번호 확인 변수
  const [chkPwd, setChkPwd] = useState("");
  // 4. 사용자 이름 변수
  const [userName, setUserName] = useState("");
  // 5. 이메일 변수
  const [email, setEmail] = useState("");

  // [2] 에러상태관리 변수
  // -> 에러상태값 초기값은 에러 아님(false)
  // 1. 아이디 변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호 변수
  const [pwdError, setPwdError] = useState(false);
  // 3. 비밀번호 확 변수
  const [chkPwdError, setChkPwdError] = useState(false);
  // 4. 사용자 이름 변수
  const [userNameError, setUserNameError] = useState(false);
  // 5. 이메일 변수
  const [emailError, setEmailError] = useState(false);

  // [ 아이디 관련 메시지 프리셋 ]
  const msgId = [
    "User ID must contain a minimum of 5 characters",
    "This ID is already in use!",
    "That's a great ID!",
  ];

  // [ 기타 메시지 프리셋 ]
  const msgEtc = {
    // 비밀번호
    pwd: "5 to 15 digits in the form of special characters, characters, and numbers",
    // 비밀번호 확인
    confPwd: "Password verification does not match",
    // 필수입력
    req: "This is a required entry",
    // 이메일
    email: "Please enter a valid email format",
  }; ///// msgEtc ///////

  // [3] 에러메시지 상태변수
  const [idMsg, setIdMsg] = useState(msgId[0]);

  // [ 유효성 검사 함수 ]
  // 1. 아이디 유효성 검사
  const changeUserId = e => {
    // 입력된 값 읽기
    let val = e.target.value;

    // 1. 아이디 유효성 검사식(따옴표로 싸지 말 것!)
    const valid = /^[A-Za-z0-9+]{5,}$/;
    // 유효성 검사방법 : 정규식.test(값)

    // 2. 입력값 확인 : e.target
    console.log(val);

    // 3. 에러 상태 분기하기
    // 3-1. 에러 아닐 때
    if(valid.test(val)){
        console.log("통과!");
        setUserIdError(false);
    } /// if ///
    // 3-2. 에러일 때
    else{
        console.log("에러!");
        setUserIdError(true);
    } /// else ///

    // 실제 userId상태변수값이 업데이트 돼야만 화면에 출력된다!
    setUserId(val);
  };

  // 코드 리턴 구역 /////////
  return (
    <div className="outbx">
      <section className="membx">
        <h2>Join Us</h2>
        <form action="process.php" method="post">
          <ul>
            <li>
                {/* 1. 아이디 */}
              <label>ID : </label>
              <input
                type="text"
                maxLength="20"
                placeholder="Please enter your ID"
                value={userId}
                onChange={changeUserId}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                userIdError &&
                <div className="msg">
                    <small style={{
                        color: "red",
                        fontSize: "10px"
                    }}>
                        {idMsg}
                    </small>
                </div>
              }
            </li>
            <li>
              <label>Password : </label>
              <input
                type="password"
                maxLength="20"
                placeholder="Please enter your Password"
              />
            </li>
            <li>
              <label>Confirm Password : </label>
              <input
                type="password"
                maxLength="20"
                placeholder="Please enter your Confirm Password"
              />
            </li>
            <li>
              <label>User Name : </label>
              <input
                type="text"
                maxLength="20"
                placeholder="Please enter your Name"
              />
            </li>
            <li>
              <label>Email : </label>
              <input
                type="text"
                maxLength="50"
                placeholder="Please enter your Email"
              />
            </li>
            <li style={{ overflow: "hidden" }}>
              <button className="sbtn">Submit</button>
            </li>
            <li>
              Are you already a Member?
              <Link to="/login"> Log In</Link>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Member;
