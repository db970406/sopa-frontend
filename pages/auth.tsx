/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.11
 */

import MainLayout from '@components/shared/MainLayout';
import { useRecoilValue } from 'recoil';
import { loginModeState } from '@utils/atoms';
import Login from '@components/user/Login';
import LoginOrSignUp from '@components/form/LoginOrSignUp';
import CreateUser from '@components/user/create/CreateUser';

export default function AuthenticationPage() {
    const loginMode = useRecoilValue(loginModeState);

    return (
        <MainLayout title="로그인">
            <LoginOrSignUp leftText='로그인' rightText='회원가입' />
            {loginMode ? <Login /> : <CreateUser />}
        </MainLayout>
    )
}