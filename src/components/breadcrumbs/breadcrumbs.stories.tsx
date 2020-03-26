import React, { ReactNode } from 'react'
import { Breadcrumbs } from './index'

export default { title: 'BreadCrumbs' }

export const common = (): ReactNode => {
    return <Breadcrumbs breadcrumbs={[{ text: '一级目录' }, { text: '二级目录' }, { text: '三级目录' }]} />
}

export const link = (): ReactNode => {
    return (
        <Breadcrumbs
            breadcrumbs={[
                { text: '一级目录', href: 'https://www.baidu.com' },
                { text: '二级目录', href: 'https://www.google.com' },
                { text: '三级目录', href: 'https://www.youtube.com' },
            ]}
        />
    )
}

export const separator = (): ReactNode => {
    return <Breadcrumbs separator='|' breadcrumbs={[{ text: '一级目录' }, { text: '二级目录' }, { text: '三级目录' }]} />
}
