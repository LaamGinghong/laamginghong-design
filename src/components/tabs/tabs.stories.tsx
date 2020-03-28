import React, { FC, useCallback, useEffect, useState } from 'react'
import Tabs from './tabs'

export default { title: 'Tabs' }

export const Common: FC = () => {
    return (
        <Tabs tabs={['第一个', '第二个', '第三个', '第四个']}>
            <div>第一个</div>
            <div>第二个</div>
            <div>第三个</div>
            <div>第四个</div>
        </Tabs>
    )
}

export const Control: FC = () => {
    const [active, setActive] = useState<number>()

    useEffect(() => {
        setTimeout(() => {
            setActive(3)
        }, 2000)
    }, [])

    const handleActive = useCallback((key: number): void => {
        setActive(key)
    }, [])

    return (
        <>
            <Tabs tabs={['第一个', '第二个', '第三个', '第四个']} activeKey={active} onChange={handleActive}>
                <div>第一个</div>
                <div>第二个</div>
                <div>第三个</div>
                <div>第四个</div>
            </Tabs>
        </>
    )
}

export const Lazy: FC = () => {
    return (
        <Tabs tabs={['红色', '绿色']} lazy>
            <Children color='red' />
            <Children color='green' />
        </Tabs>
    )
}

const Children: FC<{ color: string }> = ({ color }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    return loading ? <p>loading</p> : <div style={{ color }}>Text</div>
}
