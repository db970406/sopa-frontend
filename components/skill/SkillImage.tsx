/**
 * 생성일: 2022.02.18
 * 수정일: 2022.03.05
 */

import type { IFetchedSkillsInfo, IMakeSkillImages } from '@utils/types/interfaces';
import { makeSkillImages } from '@utils/utilFunctions';

interface ISkillImage {
    displayMode?: boolean;
    frontends: IFetchedSkillsInfo[];
    backends: IFetchedSkillsInfo[];
    apps: IFetchedSkillsInfo[];
};


export default function SkillImage({ displayMode = false, frontends, backends, apps }: ISkillImage) {
    const skillsInfo = makeSkillImages(frontends, backends, apps);

    return (
        <>
            {displayMode ? (
                skillsInfo?.length > 3 ? (
                    <>
                        {skillsInfo?.slice(0, 3).map((skill: IMakeSkillImages, index: number) =>
                            <div
                                key={index}
                                className="
                                    flex flex-col items-center 
                                    text-xs
                                "
                            >
                                <img
                                    src={skill.imgSrc}
                                    className="w-12 h-12"
                                />
                                <p className="font-bold">{skill.name}</p>
                            </div>
                        )}
                        <div
                            className="place-self-center p-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="fuchsia">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </>
                ) : (
                    skillsInfo?.map((skill: IMakeSkillImages, index: number) =>
                        <div
                            key={index}
                            className="
                                flex flex-col items-center 
                                text-xs
                            "
                        >
                            <img
                                src={skill.imgSrc}
                                className="w-12 h-12"
                            />
                            <p className="font-bold">{skill.name}</p>
                        </div>
                    )
                )
            ) : (
                skillsInfo?.map((skill: IMakeSkillImages, index: number) =>
                    <div
                        key={index}
                        className="
                            flex flex-col items-center 
                            text-xs
                        "
                    >
                        <img
                            src={skill.imgSrc}
                            className="w-12 h-12"
                        />
                        <p className="font-bold">{skill.name}</p>
                    </div>
                )
            )
            }
        </>
    );
};