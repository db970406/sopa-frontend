/**
 * 생성일: 2022.02.18
 * 수정일: 2022.02.21
 */

import { IPostDetail } from '@utils/types/interfaces';
import EditPost from '../edit/EditPost';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { postEditMode } from '@utils/atoms';
import { useEffect } from 'react';
import SeePostDetail from './SeePostDetail';

interface IPostDetailComponent {
    postTitle: string;
    seePost: IPostDetail
}


export default function SeePost({ postTitle, seePost }: IPostDetailComponent) {
    const isPostEditMode = useRecoilValue(postEditMode);
    const resetIsPostEditMode = useResetRecoilState(postEditMode);

    useEffect(() => {
        resetIsPostEditMode();
    }, []);
    return (
        isPostEditMode ? (
            <EditPost
                postId={seePost?.id}
                title={seePost?.title}
                description={seePost?.description}
                openChatLink={seePost?.openChatLink}
                frontends={seePost?.frontends}
                backends={seePost?.backends}
                apps={seePost?.apps}
            />
        ) : (
            <SeePostDetail pageTitle={postTitle} seePost={seePost} />
        )
    )
}