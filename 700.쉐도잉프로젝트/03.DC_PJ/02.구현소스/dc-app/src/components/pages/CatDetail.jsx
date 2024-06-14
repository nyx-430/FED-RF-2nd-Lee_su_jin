// DC PJ 캐릭터 상세페이지
// -> 캐릭터 리스트로 부터 라우팅 이동하여 보이는 페이지

import React from 'react';
import Banner from '../modules/Banner';
import CatList from '../modules/CatList';

// CSS 불러오기
import "../../css/cat_detail.scss";

function CatDetail() {
    // 라우터 호출시 전달한 값을 받는다
    return (
        <>
            {/* 1. 배너 모듈  */}
            <Banner catName={"SUPERMAN"} />
            {/* 2. 상세 정보 박스 */}
            <div className="detail">
                {/* 2-1. 캐릭터 설명 박스 */}
                <div className="desc-box">
                    {/* 캐릭터 명 */}
                    <h2>{"수퍼맨"}</h2>
                    {/* 캐릭터 소개 */}
                    <div className="cdesc">
                        <p>{"수퍼맨은 미국의 뉴욕에서 태어난 캐릭터이다."}</p>
                    </div>
                </div>
                {/* 2-2. 캐릭터 명세 */}
                <div className="facts">
                    <div>
                        <h3>CHARACTER FACTS</h3>
                        {/* 테이블로 명세 배열만큼 tr을 만들어 준다! */}
                        <table>
                            <tbody>
                                <tr>명세</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 3. 캐릭터 리스트 모듈 */}
            <CatList />
        </>
    );
}

export default CatDetail;