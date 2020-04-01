import React, { FC, MutableRefObject, useCallback, useLayoutEffect, useRef, MouseEvent, useState } from 'react'
import Big from 'big.js'
import { chunk } from 'laamginghong-utils'
import domAlign from 'dom-align'
import classNames from 'classnames'
import { DoubleLeftOutlined, DoubleRightOutlined } from '../../icon'
import '../style.less'
import { YEAR_DECADE, YEAR_CENTURY } from '../constant'
import { Flex } from '../../flex'

export interface CenturyPickerMenuProps {
    year: number
    onChange(year: number): void
    container: MutableRefObject<HTMLDivElement>
}

const CenturyPickerMenu: FC<CenturyPickerMenuProps> = ({ year, onChange, container }) => {
    const centuryPickerRef = useRef<HTMLDivElement>()
    useLayoutEffect((): void => {
        domAlign(centuryPickerRef.current, container.current, {
            points: ['tl', 'bl'],
            overflow: { adjustX: 1, adjustY: 1 },
            targetOffset: [0, 0],
            offset: [0, 6],
        })
    }, [])

    const [startYear, setStartYear] = useState(+Big(Math.floor(+Big(year).div(YEAR_CENTURY))).times(YEAR_CENTURY))
    const endYear = +Big(startYear).plus(YEAR_CENTURY).minus(YEAR_DECADE)
    const yearBox: { year: number; isNotThisCentury: boolean }[] = []

    for (let i = startYear; i <= endYear; i += YEAR_DECADE) {
        yearBox.push({
            year: i,
            isNotThisCentury: false,
        })
    }
    yearBox.unshift({
        year: +Big(startYear).minus(YEAR_DECADE),
        isNotThisCentury: true,
    })
    yearBox.push({
        year: +Big(endYear).plus(YEAR_DECADE),
        isNotThisCentury: true,
    })

    const list = chunk(yearBox, 3)

    const handleClick = useCallback((event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
    }, [])

    const handleNextCentury = useCallback((): void => {
        setStartYear(+Big(startYear).plus(YEAR_CENTURY))
    }, [startYear])

    const handlePrevCentury = useCallback((): void => {
        setStartYear(+Big(startYear).minus(YEAR_CENTURY))
    }, [startYear])

    const handleSelect = useCallback(
        ({ year }: { year: number }): void => {
            onChange(year)
        },
        [onChange],
    )

    return (
        <div className='century-picker-menu' ref={centuryPickerRef} onClick={handleClick}>
            <Flex justifyContent='spaceBetween' alignItems='center' className='century-picker-menu-header'>
                <DoubleLeftOutlined className='century-picker-menu-header-icon' onClick={handlePrevCentury} />
                <span className='century-picker-menu-header-button'>
                    {startYear}-{endYear}
                </span>
                <DoubleRightOutlined className='century-picker-menu-header-icon' onClick={handleNextCentury} />
            </Flex>
            <div className='century-picker-menu-content'>
                <table>
                    <tbody>
                        {list.map((tr) => (
                            <tr key={JSON.stringify(tr)}>
                                {tr.map((td) => (
                                    <td
                                        key={td.year.toString()}
                                        onClick={(): void => handleSelect(td)}
                                        className={classNames('century-picker-menu-content-item', {
                                            'is-not-this-century': td.isNotThisCentury,
                                            selected: Big(year).gte(td.year) && Big(year).lte(Big(td.year).plus(YEAR_DECADE).minus(1)),
                                        })}>
                                        <div>
                                            {td.year}-{+Big(td.year).plus(YEAR_DECADE).minus(1)}
                                        </div>
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

export default CenturyPickerMenu
