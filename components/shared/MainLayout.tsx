/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.03
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from './NavBar';

interface IMainLayout {
    loading?: boolean;
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ loading, title, children }: IMainLayout) {
    const { pathname } = useRouter();
    const isAuthPage = pathname === "/auth";

    return (
        <div
            className={`
                font-NotoSans select-none box-border dark:bg-dark-ultra dark:text-dark-text-color
            `}
        >
            <Head>
                <title>{title?.includes("undefined") || loading ? "SOPA" : `${title} | SOPA`} </title>
            </Head>
            {isAuthPage ? null : <NavBar />}
            <div
                className={`
                    flex flex-col
                    justify-center py-16 px-8 
                    ${isAuthPage ? "flex items-center" : ""}
                `}
            >
                {children}
                <footer
                    className="py-64"
                />
            </div>
        </div>
    )
}