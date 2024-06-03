// 전체 레이아웃 컴포넌트

import MainArea from "./MainArea";
import TopArea from "./TopArea";
import FooterArea from "./FooterArea";

export default function Layout (){
    // 코드 리턴 구역 ////////////
    return (
        <>
            {/* 1.상단영역 */}
            <TopArea />
            {/* 2.메인영역 */}
            <MainArea />
            {/* 3.하단영역 */}
            <FooterArea />
        </>
    );
} ////////////// Layout //////////////