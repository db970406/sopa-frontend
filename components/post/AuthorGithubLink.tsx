/**
 * 생성일: 2022.03.09
 * 수정일: ------
 */

import { IUserInfo } from '@utils/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';

interface IAuthorGithubLinkComponent {
    user: IUserInfo
}

export default function AuthorGithubLink({ user }: IAuthorGithubLinkComponent) {
    return (
        user?.githubURL ? (
            <div
                className="flex items-center space-x-2"
            >
                <Image
                    src="/github.png"
                    width={30}
                    height={30}
                    alt=""
                    className='bg-white rounded-full'
                />
                <Link
                    href={user?.githubURL}
                >
                    <a
                        className="
                            hover:text-sopa-default text-lg font-bold transition
                        "
                    >
                        {user?.name}
                    </a>
                </Link>
            </div>
        ) : (
            <p
                className="
                    text-lg font-bold
                "
            >
                {user?.name}
            </p>
        )
    )
}