/**
 * 생성일: 2022.02.17
 * 수정일: 2022.03.02
 */

import type { IPostDisplay } from '@utils/types/interfaces';
import MetaData from '../MetaData';
import SkillImage from '../../skill/SkillImage';
import { getUploadedDate } from '@utils/utilFunctions';

// index 페이지나 profile페이지에서 게시글의 대략적인 정보를 알려 줄 DisplayPost Component
export default function DisplayPost(
    { id, title, commentCount, isExpired, likeCount, isLiked, readCount, frontends, backends, apps, createdAt }: IPostDisplay
) {
    return (
        <div
            className={`
                border-2 border-fuchsia-100 rounded-lg p-6
                w-full h-full
                flex flex-col justify-between items-center
                space-y-8 shadow-xl
                hover:scale-105 transition-all duration-300 cursor-pointer
                hover:border-sopa-pure hover:ring-2 ring-sopa-default ring-offset-2
                dark:bg-dark-default
            `}
        >
            <div
                className={`
                    flex flex-wrap gap-6
                    justify-center
                `}
            >
                <SkillImage
                    displayMode
                    frontends={frontends}
                    backends={backends}
                    apps={apps}
                />
            </div>
            <h1
                className='
                    font-bold line-clamp-2 text-lg lg:text-xl
                '
            >
                {title}
            </h1>
            <div
                className={`
                    flex justify-between w-full
                    items-center place-self-end
                `}
            >
                <MetaData
                    commentCount={commentCount}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    postId={id}
                    readCount={readCount}
                />
                <p
                    className={`
                        text-sm font-semibold
                        place-self-end
                    `}
                >
                    {getUploadedDate(+createdAt)}
                </p>
            </div>
        </div>
    )
}
