/**
 * 생성일: 2022.02.17
 * 수정일: 2022.02.25
 */

import MainLayout from '@components/shared/MainLayout'
import EditUser from '@components/user/edit/EditUser'
import useMyInfo from 'hooks/useMyInfo';

export default function UserEditPage() {
    const { seeMyInfo } = useMyInfo();

    return (
        <MainLayout title={`${seeMyInfo?.name} 수정`}>
            <div
                className={`
                    lg:px-32
                `}
            >
                <EditUser />
            </div>
        </MainLayout>
    )
}