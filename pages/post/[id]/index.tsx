/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.05
 */

import { gql, useQuery } from '@apollo/client';
import SeePost from '@components/post/read/SeePost';
import MainLayout from '@components/shared/MainLayout';
import { COMMENT_FRAGMENT, POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { ICommentInfo, IPostDetail } from '@utils/types/interfaces';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SEE_POST_QUERY = gql`
    query seePost($postId:Int!,$offset:Int){
        seePost(postId:$postId){
            post{
                ...PostDisplayFragment
                comments(offset:$offset){
                    ...CommentFragment
                }
            }
            error
        }
    }
    ${POST_DISPLAY_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

interface ISeePostCompleted {
    seePost: {
        post: IPostDetail;
        error?: string;
    };
}

const PostDetailPage: NextPage = () => {
    const router = useRouter();
    const { id: postId, title: postTitle } = router.query;
    const [comments, setComments] = useState<ICommentInfo[]>([]);

    const seePostCompleted = ({ seePost }: ISeePostCompleted) => {
        const { error }: any = seePost;
        if (error) {
            alert(error);
            router.replace("/");
            return;
        }
    };

    const { data, fetchMore } = useQuery(SEE_POST_QUERY, {
        variables: {
            postId: +postId!
        },
        onCompleted: seePostCompleted
    });
    useEffect(() => {
        setComments(data?.seePost?.post?.comments!);
    }, [data]);

    return (
        <MainLayout title={`${postTitle || data?.seePost?.post?.title}`}>
            <SeePost
                fetchMore={
                    () => fetchMore({
                        variables: { offset: data?.seePost?.post?.comments?.length },
                    })
                }
                comments={comments}
                postTitle={postTitle as string}
                seePost={data?.seePost?.post!}
            />
        </MainLayout>
    );
};

export default PostDetailPage;