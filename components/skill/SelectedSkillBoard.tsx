/**
 * 생성일: 2022.02.11
 * 수정일: 2022.02.27
 */

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedSkillsState, skillsState } from '@utils/atoms';
import { ISkill } from '@utils/types/interfaces';

interface ISelectedSkillBoard {
    refetchSeePosts: any;
    refetchSeePostsCount: any
}

export default function SelectedSkillBoard({ refetchSeePosts, refetchSeePostsCount }: ISelectedSkillBoard) {
    const [selectedSkills, setSelectedSkills] = useRecoilState(selectedSkillsState);
    const setSkills = useSetRecoilState(skillsState);

    const onClick = (selectedSkill: ISkill, index: number): void => {
        // SelectedSkillBoard에서 선택하면 selectedSkillsState에서 값을 삭제함
        setSelectedSkills(prev => {
            const copiedPrev = [...prev];
            copiedPrev.splice(index, 1);

            return [
                ...copiedPrev
            ]
        })

        // SelectedSkillBoard에서 선택하면 skillsState로 다시 추가시킴
        setSkills(prev => {
            const skillsOfCopiedPosition = [...prev[selectedSkill.position]];

            const targetIndex = skillsOfCopiedPosition.findIndex(skill => skill.skill === selectedSkill.skill);

            const unSelect = {
                ...selectedSkill,
                isSelected: false
            };

            skillsOfCopiedPosition.splice(targetIndex, 1);
            skillsOfCopiedPosition.splice(targetIndex, 0, unSelect);
            return {
                ...prev,
                [selectedSkill.position]: skillsOfCopiedPosition,
            }
        })
    }

    useEffect(() => {
        const clearedSelectedSkills = selectedSkills.map(skill => {
            const { isSelected, skillImage, ...skillWithPosition } = skill
            return skillWithPosition
        })

        refetchSeePosts({
            skills: JSON.stringify(clearedSelectedSkills)
        });
        refetchSeePostsCount({
            skills: JSON.stringify(clearedSelectedSkills)
        })
    }, [selectedSkills])

    return (
        <motion.div
            className={`
                flex flex-wrap justify-center gap-4 shadow-xl border-t-2 border-r-2 border-t-sopa-pure border-r-sopa-pure bg-sopa-default p-3 rounded-lg
                lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full lg:justify-center lg:rounded-none lg:rounded-r-2xl
                ${selectedSkills.length > 9 ? "lg:w-40" : null}
            `}
            initial={{
                x: -100,
                opacity: 0
            }}
            animate={{
                x: selectedSkills.length > 0 ? 0 : undefined,
                opacity: selectedSkills.length > 0 ? 1 : undefined,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            {selectedSkills?.map((selectedSkill, index) =>
                <motion.button
                    key={selectedSkill.skill}
                    onClick={() => onClick(selectedSkill, index)}
                    layoutId={selectedSkill.skill}
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
    )
}