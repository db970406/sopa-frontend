import { gql } from '@apollo/client'
import SkillBoards from '@components/home/SkillBoards'
import MainLayout from '@components/shared/MainLayout'
import useMyInfo from 'hooks/useMyInfo'
import type { GetServerSideProps } from 'next'
import { client } from '@utils/apollo'
import { useEffect } from 'react'
import { useResetRecoilState, useRecoilState } from 'recoil'
import { selectedSkillsState, postsState } from '@utils/atoms'
import Post from '@components/post/Post'
import { POST_DISPLAY_FRAGMENT } from '@utils/fragments'
import { IPost } from '@utils/types/interfaces'

interface IHome {
  requestedPosts: IPost[];
}

const SEE_POSTS_QUERY = gql`
    query seePosts{
        seePosts{
            ...PostDisplayFragment
        }
    }
    ${POST_DISPLAY_FRAGMENT}
`

const Home = ({ requestedPosts }: IHome) => {
  const [posts, setPosts] = useRecoilState(postsState);
  const { seeMyProfile } = useMyInfo();
  const resetSelectedSkill = useResetRecoilState(selectedSkillsState);

  useEffect(() => {
    resetSelectedSkill();
    setPosts(requestedPosts);
  }, []);
  console.log(posts)
  return (
    <MainLayout title="당신의 소울파트너">
      <SkillBoards />
      <div
        className={`
          flex flex-wrap gap-3
        `}
      >
        {posts.map(post => <Post key={post.id} {...post} />)}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // seePosts query 요청부
  const { data } = await client.query({
    query: SEE_POSTS_QUERY,
  });
  return {
    props: {
      requestedPosts: data.seePosts,
    }
  }
}

export default Home
