/**
 * 생성일: 2022.02.21
 * 수정일: 2022.03.05
 */

import { gql, useLazyQuery } from '@apollo/client';
import { postsState, searchModeState } from '@utils/atoms';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import { IPostSemiDetailInfo } from '@utils/types/interfaces';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useResetRecoilState, useSetRecoilState } from 'recoil';


const SEARCH_POSTS_QUERY = gql`
    query searchPosts($title:String!){
        searchPosts(title:$title){
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;


interface IForm {
    title: string;
};

interface ISearchPostsCompleted {
    searchPosts: IPostSemiDetailInfo[]
};

const searchInputVariants = {
    invisible: {
        opacity: 0,
        x: 70,
    },
    visible: {
        opacity: 1,
        x: -30,
        transition: {
            duration: 0.3
        }
    }
};

export default function SearchPosts() {
    const setPosts = useSetRecoilState(postsState);
    const resetSearchMode = useResetRecoilState(searchModeState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    // lazyQuery 처리 후 postsState에 데이터 저장
    const searchPostsCompleted = ({ searchPosts }: ISearchPostsCompleted) => {
        setPosts(searchPosts);
        setValue("title", "");
    };

    // 컴포넌트가 렌더되었을 때가 아닌 내가 원할 때 query를 작동시켜야 하므로 lazyQuery 사용
    const [searchPostsMutation, { loading }] = useLazyQuery(SEARCH_POSTS_QUERY, {
        onCompleted: searchPostsCompleted
    });

    const onValid = ({ title }: IForm) => {
        if (loading) return;

        searchPostsMutation({
            variables: {
                title
            }
        });
    };

    return (
        <motion.div
            variants={searchInputVariants}
            initial="invisible"
            animate="visible"
            className="absolute z-50 flex items-center px-2 py-1 space-x-2 bg-white border-2 shadow-lg  rounded-xl border-sopa-pure dark:bg-dark-default focus-within:border-sopa-accent"
        >
            <button
                onClick={resetSearchMode}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="fuchsia">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <form
                onSubmit={handleSubmit(onValid)}
            >
                <motion.input
                    {...register("title", {
                        required: true,
                    })}
                    type="text"
                    className="px-2 border-l-2 rounded-r-lg  border-l-sopa-pure dark:bg-dark-default focus:outline-none"
                    placeholder='제목을 입력하세요'
                    required
                />
            </form>
        </motion.div>
    );
};