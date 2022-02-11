import { gql } from '@apollo/client'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import SkillBoard from '../components/home/SkillBoard';
import MainLayout from '../components/shared/MainLayout'
import { client } from '../utils/apollo'
import { skillsState, tokenState } from '../utils/atoms';

interface IPost {
  __typename: string;
  id: number;
  title: string;
}
interface IMyInfo {
  myInfoData: {
    id: number;
    name: string;
    email: string;
  }
};
interface IHome {
  myInfoData: IMyInfo;
  posts: IPost[];
}

const SEE_MY_PROFILE_QUERY = gql`
  query seeMyProfile{
      seeMyProfile{
          id
          name
          email
      }
  }
`;

const Home = ({ posts, myInfoData }: IHome) => {
  const [token, setToken] = useRecoilState(tokenState);
  const skills = useRecoilValue(skillsState);

  useEffect(() => {
    if (!myInfoData) {
      document.cookie = `TOKEN=; expires=${new Date().toUTCString()};`;
      setToken("");
    }
    else setToken(document.cookie.split("TOKEN=")[1])
  }, [myInfoData]);
  return (
    <MainLayout title="당신의 소울파트너">
      <div
        className={`
            space-y-4
        `}
      >
        {Object.keys(skills).map((position, index) => <SkillBoard key={index} position={position} skillOfPosition={skills[position]} />)}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // seePosts query 요청부
  const { data } = await client.query({
    query: gql`
      query seePosts{
        seePosts{
          id
          title
        }
      }
    `
  });

  // SSR Authorization 구현부
  const tokenInCookie = ctx.req.headers.cookie
  const token = tokenInCookie?.split("TOKEN=")[1]

  const { data: myInfoData } = await client.query({
    query: SEE_MY_PROFILE_QUERY,
    context: {
      headers: {
        token
      }
    },
    // cache와 상관없이 무조건 서버로 요청보내서 토큰이 유효한지 확인받을 것이다
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      posts: data.seePosts,
      myInfoData: myInfoData.seeMyProfile
    }
  }
}

export default Home
