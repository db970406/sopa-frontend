/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { tokenState } from '@utils/atoms';
import useMyInfo from 'hooks/useMyInfo';
import SearchPostsBtn from '@components/post/search/SearchPostsBtn';
import LoginHoverEvent from './LoginHoverEvent';
import React, { useEffect } from 'react';
import Image from 'next/image';

function NavBar() {
    const [token, setToken] = useRecoilState(tokenState);
    const { seeMyInfo } = useMyInfo();
    const router = useRouter();
    const isHomePage = router.pathname === "/";
    const isMyProfilePage = router.pathname === "/user/profile";

    const goToLogin = () => router.push("/auth");
    const goToCreatePost = () => router.push("/post/upload");
    const goToSeeMyProfile = () => router.push(`/user/profile`);
    const goToEditUser = () => router.push("/user/edit");

    useEffect(() => {
        // token state값이 변경될 때 마다 로컬 스토리지에 저장된 token을 set함
        setToken(localStorage.getItem("TOKEN"));
    }, [token, setToken]);

    return (
        <div
            className="
                    flex justify-around items-center top-0 rounded-b-3xl
                    w-full h-24 px-10
                    shadow-md
                "
        >
            <div
                onClick={() => router.push("/")}
                className="
                    rounded-full
                    w-16 h-16
                    border-opacity-50 
                    hover:scale-110 
                    transition cursor-pointer
                "
            >
                <Image
                    src="/sopa.png"
                    alt="소파"
                    width={70}
                    height={70}
                    quality={100}
                />
            </div>

            <div
                className={`
                    flex items-center
                    space-x-8
                `}
            >
                {isHomePage ? (
                    <SearchPostsBtn />
                ) : null}

                <button
                    onClick={token ? goToCreatePost : goToLogin}
                    className="font-bold"
                >
                    글 쓰기
                </button>

                {token ? (
                    isMyProfilePage ? (
                        <button
                            className="
                                font-bold text-sopa-default text-lg
                                hover:text-sopa-accent 
                                transition
                            "
                            onClick={goToEditUser}
                        >
                            {seeMyInfo?.name}
                        </button>
                    ) : (
                        <button
                            className="
                                font-bold text-sopa-default text-lg 
                                hover:text-sopa-accent 
                                transition 
                            "
                            onClick={goToSeeMyProfile}
                        >
                            프로필
                        </button>
                    )
                ) : (
                    <LoginHoverEvent />
                )}
            </div>
        </div>
    );
};

// 사용중인 page에서 리렌더링이 일어난다고 해서 덩달아 리렌더링 되지 않게 한다.
export default React.memo(NavBar);