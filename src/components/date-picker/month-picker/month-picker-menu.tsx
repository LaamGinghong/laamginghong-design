import React, { FC, MutableRefObject, useCallback, useLayoutEffect, useRef, MouseEvent, useState } from 'react'
import domAlign from 'dom-align'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { chunk } from 'laamginghong-utils'
import { LeftOutlined, RightOutlined } from '../../icon'
import { Flex } from '../../flex'
import YearPickerMenu from '../year-picker/year-picker-menu'
import { MONTHS } from '../constant'
import '../style.less'

export interface MonthPickerMenuProps {
    month: number
    year: number
    onSelect(date: Date): void
    container: MutableRefObject<HTMLDivElement>
}

const MonthPickerMenu: FC<MonthPickerMenuProps> = ({ month, year, onSelect, container }) => {
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState<Date>(new Date(year, month))
    const list = chunk(MONTHS, 3)
    const menuPickerRef = useRef<HTMLDivElement>()

    useLayoutEffect((): void => {
        if (!visible) {
            domAlign(menuPickerRef.current, container.current, {
                points: ['tl', 'bl'],
                overflow: { adjustX: 1, adjustY: 1 },
                targetOffset: [0, 0],
                offset: [0, 6],
            })
        }
    }, [visible, container])

    const handleClick = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
    }, [])

    const handleSelect = useCallback(
        (index: number): void => {
            onSelect(dayjs(date).set('month', index).toDate())
        },
        [date, onSelect],
    )

    const handleNextYear = useCallback((): void => {
        setDate(dayjs(date).add(1, 'year').toDate())
    }, [month, date])

    const handlePrevYear = useCallback((): void => {
        setDate(dayjs(date).subtract(1, 'year').toDate())
    }, [month, date])

    const handleVisible = useCallback((): void => {
        setVisible(true)
    }, [])

    const handleChangeYear = useCallback(
        (year: number): void => {
            setDate(new Date(year, month))
            setVisible(false)
        },
        [month],
    )

    if (visible) {
        return <YearPickerMenu year={year} onChange={handleChangeYear} container={container} />
    }

    return (
        <div className='month-picker-menu' ref={menuPickerRef} onClick={handleClick}>
            <Flex justifyContent='spaceBetween' alignItems='center' className='month-picker-menu-header'>
                <LeftOutlined className='month-picker-menu-header-icon' onClick={handlePrevYear} />
                <span className='month-picker-menu-header-button' onClick={handleVisible}>
                    {dayjs(date).year()}年
                </span>
                <RightOutlined className='month-picker-menu-header-icon' onClick={handleNextYear} />
            </Flex>
            <div className='month-picker-menu-content'>
                <table>
                    <tbody>
                        {list.map((tr, index) => (
                            <tr key={tr}>
                                {tr.map((td, subIndex) => (
                                    <td
                                        onClick={(): void => handleSelect(index * 3 + subIndex)}
                                        key={td}
                                        className={classNames('month-picker-menu-content-item', {
                                            selected: month === index * 3 + subIndex && dayjs(date).year() === year,
                                        })}>
                                        <div>{td}</div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonthPickerMenu
