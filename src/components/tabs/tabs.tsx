import React, { Children, FC, ReactNode, useCallback, useState } from 'react'
import classNames from 'classnames'
import './style.less'

export interface TabsProps {
    tabs: string[]
    activeKey?: number
    onChange?: (key: number) => void
    defaultActiveKey?: number
    tabPosition?: 'top' | 'bottom' | 'left' | 'right'
    lazy?: boolean
}

const Tabs: FC<TabsProps> = ({ tabs, activeKey, onChange, defaultActiveKey = 0, tabPosition = 'top', lazy, children }) => {
    console.warn('The position attribute is not currently supported!')

    if (defaultActiveKey > tabs.length) {
        console.warn("DefaultActiveKey is larger than tabs' length")
    }
    const [active, setActive] = useState<number>(defaultActiveKey)

    const handleActive = useCallback(
        (index: number): void => {
            if (activeKey !== undefined) {
                onChange && onChange(index)
                return
            }
            setActive(index)
        },
        [activeKey, onChange],
    )

    const renderChildren = (): ReactNode => {
        return (
            <>
                {Children.toArray(children).map((item, index) => (
                    <div key={item as string} className={classNames({ hidden: (activeKey ?? active) !== index })}>
                        {item}
                    </div>
                ))}
            </>
        )
    }

    const renderChildrenLazy = (): ReactNode => {
        const nodes = Children.toArray(children)
        return <>{nodes[activeKey ?? active]}</>
    }

    return (
        <div className='tabs-container'>
            <div className={classNames('tabs', { 'tabs-top': tabPosition === 'top' })}>
                {tabs.map((item, index) => (
                    <div
                        className={classNames('tab', {
                            active: (activeKey ?? active) === index,
                        })}
                        key={item}
                        onClick={(): void => handleActive(index)}>
                        {item}
                    </div>
                ))}
            </div>
            {lazy ? renderChildrenLazy() : renderChildren()}
        </div>
    )
}

export default Tabs
