import { gql, useQuery } from '@apollo/client';
import SkillBoards from '@components/skill/SkillBoards';
import MainLayout from '@components/shared/MainLayout';
import type { GetServerSideProps } from 'next';
import { client } from '@utils/apollo';
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments';
import type { IPostDisplay } from '@utils/types/interfaces';
import SeePosts from '@components/post/read/SeePosts';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postsState, searchModeState } from '@utils/atoms';
import SelectedSkillBoard from '@components/skill/SelectedSkillBoard';
import SortPosts from '@components/post/SortPosts';

interface ISeePostsQuery {
  [key: string]: IPostDisplay[];
};
interface ISeePostsCountQuery {
  seePostsCount: {
    count: number;
  };
};

const SEE_POSTS_QUERY = gql`
    query seePosts($offset:Int,$skills:String,$howToSort:String){
        seePosts(offset:$offset,skills:$skills,howToSort:$howToSort){
          ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`;

const SEE_POSTS_COUNT_QUERY = gql`
  query seePostsCount($skills:String){
    seePostsCount(skills:$skills){
      count
    }
  }
`;

const Home = ({ requestedPosts }: ISeePostsQuery) => {
  const setPosts = useSetRecoilState(postsState);
  const searchMode = useRecoilValue(searchModeState);

  const { data: seePostsData, fetchMore, refetch: refetchSeePosts } = useQuery<ISeePostsQuery>(SEE_POSTS_QUERY);

  const { data: seePostsCountData, refetch: refetchSeePostsCount } = useQuery<ISeePostsCountQuery>(SEE_POSTS_COUNT_QUERY);

  useEffect(() => {
    setPosts(requestedPosts);
  }, [requestedPosts, setPosts]);
  useEffect(() => {
    setPosts(seePostsData?.seePosts!);
  }, [seePostsData, setPosts]);
  useEffect(() => {
    if (!searchMode) {
      setPosts(seePostsData?.seePosts!);
    };
  }, [searchMode, seePostsData, setPosts]);

  return (
    <MainLayout
      title="당신의 소울파트너"
    >
      {searchMode ? null : (
        <>
          <SkillBoards />
          <SelectedSkillBoard refetchSeePosts={refetchSeePosts} refetchSeePostsCount={refetchSeePostsCount} />
          <SortPosts refetchFn={refetchSeePosts} />
        </>
      )}
      <SeePosts
        howManyData={seePostsCountData?.seePostsCount?.count!}
        fetchMore={
          () => fetchMore({
            variables: { offset: seePostsData?.seePosts?.length },
          })
        }
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // seePosts query 요청부
  const { data } = await client.query({
    query: SEE_POSTS_QUERY,
    variables: {
      howToSort: "new"
    }
  });

  return {
    props: {
      requestedPosts: data.seePosts,
    }
  };
};

export default Home;
