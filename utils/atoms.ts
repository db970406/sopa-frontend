/**
 * 생성일: 2022.02.08
 * 수정일: 2022.03.05
 */

import { atom, selector } from 'recoil';
import { skillSet } from './skillSet';
import type { ICommentInfo, IPostSemiDetailInfo, ISkillInfo, ISkillsOfPositions } from './types/interfaces';
import type { kindOfSortMethod, kindOfMyActivitiesTab, KindOfPosition } from './types/types';

// LoginOrSignUp Component에서 사용하는 로그인/회원가입 화면 결정
export const loginModeState = atom<boolean>({
    key: "loginModeState",
    default: true
});

export const postEditModeState = atom<boolean>({
    key: "postEditMode",
    default: false
});
export const searchModeState = atom<boolean>({
    key: "searchModeState",
    default: false
});

export const postSortMethodState = atom<kindOfSortMethod>({
    key: "postSortMethodState",
    default: "new"
});
export const myActivitiesTabState = atom<kindOfMyActivitiesTab>({
    key: "myActivitiesTabState",
    default: "like"
});


// 브라우저가 렌더링되면 쿠키에서 토큰을 꺼내 state에 저장한다.
export const tokenState = atom<string | null>({
    key: "tokenState",
    default: null,
});

export const postsState = atom<IPostSemiDetailInfo[]>({
    key: "postsState",
    default: []
});

export const commentsState = atom<ICommentInfo[]>({
    key: "commentsState",
    default: []
});


export const skillsState = atom<ISkillsOfPositions>({
    key: "skillsState",
    default: {
        "frontend": skillSet.frontend,
        "backend": skillSet.backend,
        "app": skillSet.app
    }
});

export const selectedSkillsState = atom<ISkillInfo[]>({
    key: "selectedSkillsState",
    default: []
});

export const selectedPositionState = atom<KindOfPosition>({
    key: "selectedPositionState",
    default: "frontend"
});

export const selectedSkillsToUploadState = atom<ISkillInfo[]>({
    key: "selectedSkillsToUploadState",
    default: []
});


export const skillsOfPositionSelector = selector<ISkillInfo[]>({
    key: "skillsOfPositionSelector",
    get: ({ get }) => {
        const selectedPosition = get(selectedPositionState);
        const skills = get(skillsState);

        return skills[selectedPosition];
    }
});