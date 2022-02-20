/**
 * 생성일: 2022.02.12
 * 수정일: 2022.02.20
 */

import { gql, useQuery } from '@apollo/client'
import { useRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import { useRouter } from 'next/router';

interface IMyInfo {
    seeMyProfile: {
        id: number;
        socialLogin?: string;
        name: string;
        email: string;
    }
};
const SEE_MY_PROFILE_QUERY = gql`
    query seeMyProfile{
        seeMyProfile{
            id
            socialLogin
            name
            email
        }
    }
`;

export default function useMyInfo() {
    const [token, setToken] = useRecoilState(tokenState);
    const router = useRouter();

    const myInfoDataCompleted = (data: IMyInfo) => {
        // 만약 쿠키에 들어있는 토큰을 변조하여 보낸다면 백엔드에서 null을 보낼 것이므로 그 때는 강제 로그아웃시킨다.
        if (data.seeMyProfile === null) {
            //document.cookie = `TOKEN=; expires=${new Date().toUTCString()};`;
            localStorage.removeItem("TOKEN");
            setToken("");

            // push로 뒤로가기 히스토리 스택을 쌓을 필요가 없다.
            router.replace("/");
        }
    }

    /* 
        apollo가 알아서 요청 후에는 cache에 있는 데이터를 가져다 쓰는 cache-first가 기본값이므로
        별다른 fetchPolicy 설정은 필요없는 듯
    */
    const { data: myInfoData } = useQuery(SEE_MY_PROFILE_QUERY, {
        skip: !token,
        onCompleted: myInfoDataCompleted,
    })

    return {
        seeMyProfile: myInfoData?.seeMyProfile
    }
}