'use client'

import { Sidemenu } from '@/app/shared/components/menu/sidemenu'
import Sidebar, { SidebarBackButton } from '@/app/shared/components/nav/sidenav'
import { useRouter } from 'next/navigation'
import { BsArrowLeftCircle } from 'react-icons/bs'

export default function NewVehicle() {
    const router = useRouter();
    return (
        <>
            <Sidebar data={<SidebarBackButton />} />
            <Sidemenu type="MENU_MANAGE_FLEET" />
        </>
    )
}