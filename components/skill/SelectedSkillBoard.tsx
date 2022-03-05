/**
 * 생성일: 2022.02.11
 * 수정일: 2022.03.05
 */

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedSkillsState, skillsState } from '@utils/atoms';
import type { ISkill } from '@utils/types/interfaces';

interface ISelectedSkillBoard {
    refetchSeePosts: any;
    refetchSeePostsCount: any;
};

export default function SelectedSkillBoard({ refetchSeePosts, refetchSeePostsCount }: ISelectedSkillBoard) {
    const [selectedSkills, setSelectedSkills] = useRecoilState(selectedSkillsState);
    const setSkills = useSetRecoilState(skillsState);

    const onClick = (selectedSkill: ISkill, index: number): void => {
        // 셀렉한 스킬을 다시 클릭하면 제거 시킴
        setSelectedSkills(prev => {
            const copiedPrev = [...prev];
            copiedPrev.splice(index, 1);

            return [
                ...copiedPrev
            ]
        });

        // 그리고 원래의 스킬보드로 복귀시킨다.
        setSkills(prev => {
            const skillsOfCopiedPosition = [...prev[selectedSkill.position]];

            const targetIndex = skillsOfCopiedPosition.findIndex(skill => skill.name === selectedSkill.name);

            const unSelect = {
                ...selectedSkill,
                isSelected: false
            };

            skillsOfCopiedPosition.splice(targetIndex, 1);
            skillsOfCopiedPosition.splice(targetIndex, 0, unSelect);
            return {
                ...prev,
                [selectedSkill.position]: skillsOfCopiedPosition,
            };
        });
    };

    // 셀렉한 스킬이 변경될 때마다 query 요청을 refetch시킨다.
    useEffect(() => {
        const clearedSelectedSkills = selectedSkills.map((skill: ISkill) => {
            const { isSelected, skillImage, ...skillWithPosition } = skill;
            return skillWithPosition;
        });

        refetchSeePosts({
            skills: JSON.stringify(clearedSelectedSkills)
        });
        refetchSeePostsCount({
            skills: JSON.stringify(clearedSelectedSkills)
        });
    }, [selectedSkills]);

    return (
        <motion.div
            className={`
                flex flex-wrap justify-center gap-4 rounded-lg
                md:flex-col md:fixed md:left-0 md:top-0 md:h-full md:justify-center md:rounded-none md:rounded-r-2xl
                p-3 ${selectedSkills?.length > 9 ? "md:w-40" : null}
                bg-sopa-default 
                dark:bg-sopa-lightDark
            `}
            initial={{
                x: -100,
                opacity: 0
            }}
            animate={{
                x: selectedSkills?.length > 0 ? 0 : undefined,
                opacity: selectedSkills?.length > 0 ? 1 : undefined,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            {selectedSkills?.map((selectedSkill: ISkill, index: number) =>
                <motion.button
                    key={selectedSkill.name}
                    onClick={() => onClick(selectedSkill, index)}
                    layoutId={selectedSkill.name}
                >
                    <img
                        src={selectedSkill.skillImage}
                        className={`
                            w-14 h-14
                        `}
                    />
                </motion.button>
            )}
        </motion.div>
    );
};