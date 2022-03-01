/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.01
 */

import type { ICommentInfo, IPostDetail } from '@utils/types/interfaces';
import EditPost from '../edit/EditPost';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { postEditModeState } from '@utils/atoms';
import { useEffect } from 'react';
import SeePostDetail from './SeePostDetail';

interface IPostDetailComponent {
    postTitle: string;
    seePost: IPostDetail
    fetchMore: any;
    comments: ICommentInfo[];
}


export default function SeePost({ fetchMore, postTitle, seePost, comments }: IPostDetailComponent) {
    const isPostEditMode = useRecoilValue(postEditModeState);
    const resetIsPostEditMode = useResetRecoilState(postEditModeState);
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
            <SeePostDetail comments={comments} fetchMore={fetchMore} pageTitle={postTitle} seePost={seePost} />
        )
    )
}