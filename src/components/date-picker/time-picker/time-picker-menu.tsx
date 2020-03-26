import React, { FC, useCallback, MouseEvent, MutableRefObject, useRef, useLayoutEffect, useState } from 'react'
import dayjs, { UnitType } from 'dayjs'
import classNames from 'classnames'
import domAlign from 'dom-align'
import { Flex, FlexItem } from '../../flex'
import '../style.less'
import { Button } from '../../button'
import { DATE_MINUTES, DATE_HOURS, DATE_SECONDS } from '../constant'

export interface TimePickerMenuProps {
    time: Date
    onChange(date: Date): void
    container: MutableRefObject<HTMLDivElement>
}

const TimePickerMenu: FC<TimePickerMenuProps> = ({ time, onChange, container }) => {
    const [selected, setSelected] = useState(dayjs(time))
    const timePickerMenuRef = useRef<HTMLDivElement>()
    const hourRef = useRef<HTMLDivElement>()
    const minutesRef = useRef<HTMLDivElement>()
    const secondsRef = useRef<HTMLDivElement>()

    useLayoutEffect((): void => {
        domAlign(timePickerMenuRef.current, container.current, {
            points: ['tl', 'bl'],
            overflow: { adjustX: 1, adjustY: 1 },
            targetOffset: [0, 0],
            offset: [0, 6],
        })
        const date = dayjs(time)
        const hour = date.hour()
        const minute = date.minute()
        const second = date.second()
        hourRef.current.children[hour].scrollIntoView()
        minutesRef.current.children[minute].scrollIntoView()
        secondsRef.current.children[second].scrollIntoView()
    }, [])

    const handleClick = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
    }, [])

    const handleSelect = useCallback(
        (value: number, field: UnitType): void => {
            setSelected(selected.set(field, value))
        },
        [selected],
    )

    const handleOk = useCallback((): void => {
        onChange(selected.toDate())
    }, [selected, onChange])

    return (
        <div className='time-picker-menu' onClick={handleClick} ref={timePickerMenuRef}>
            <Flex className='time-picker-menu-content'>
                <FlexItem flex={1} className='time-picker-menu-content-columns' ref={hourRef}>
                    {DATE_HOURS.map((item) => (
                        <div
                            key={item}
                            onClick={(): void => handleSelect(+item, 'hour')}
                            className={classNames('time-picker-menu-content-columns-item', {
                                selected: +item === dayjs(selected).hour(),
                            })}>
                            {item}
                        </div>
                    ))}
                </FlexItem>
                <FlexItem flex={1} className='time-picker-menu-content-columns' ref={minutesRef}>
                    {DATE_MINUTES.map((item) => (
                        <div
                            key={item}
                            onClick={(): void => handleSelect(+item, 'minute')}
                            className={classNames('time-picker-menu-content-columns-item', {
                                selected: +item === dayjs(selected).minute(),
                            })}>
                            {item}
                        </div>
                    ))}
                </FlexItem>
                <FlexItem flex={1} className='time-picker-menu-content-columns' ref={secondsRef}>
                    {DATE_SECONDS.map((item) => (
                        <div
                            key={item}
                            onClick={(): void => handleSelect(+item, 'second')}
                            className={classNames('time-picker-menu-content-columns-item', {
                                selected: +item === dayjs(selected).second(),
                            })}>
                            {item}
                        </div>
                    ))}
                </FlexItem>
            </Flex>
            <Flex justifyContent='end' className='time-picker-menu-footer'>
                <Button size='small' type='primary' style={{ fontSize: '14px' }} onClick={handleOk}>
                    确定
                </Button>
            </Flex>
        </div>
    )
}

export default TimePickerMenu
