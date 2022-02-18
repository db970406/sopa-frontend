/**
 * 생성일: 2022.02.17
 * 수정일: ------
 */

import Link from 'next/link'
import { makeSocialLoginReqUrl } from "@utils/utilFunctions";


interface ISocialLogin {
    social: string;
}

const SocialLogin = ({ social }: ISocialLogin) => {

    return (
        <div
            className={`
                cursor-pointer
            `}
        >
            <Link href={makeSocialLoginReqUrl(social)}>
                <img className='w-12 h-12' src={`/${social}.png`} />
            </Link>
        </div>
    )
}

export default SocialLogin