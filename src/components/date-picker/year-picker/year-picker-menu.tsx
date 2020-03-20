import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  MouseEvent,
  useState,
} from 'react'
import domAlign from 'dom-align'
import Big from 'big.js'
import { Flex } from '../../flex'
import { chunk } from 'laamginghong-utils'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import '../style.less'
import CenturyPickerMenu, {
  CenturyPickerMenuProps,
} from './century-picker-menu'

export const YEAR_DECADE = 10

export interface YearPickerMenuProps extends CenturyPickerMenuProps {}

const YearPickerMenu: FC<YearPickerMenuProps> = ({
  year,
  onChange,
  container,
}) => {
  const [visible, setVisible] = useState(false)
  const [startYear, setStartYear] = useState(
    +Big(Math.floor(+Big(year).div(YEAR_DECADE))).times(YEAR_DECADE),
  )
  const endYear = +Big(startYear)
    .plus(YEAR_DECADE)
    .minus(1)
  const yearBox: { year: number; isNotThisDecade: boolean }[] = []
  for (let i = startYear; i <= endYear; i++) {
    yearBox.push({
      year: i,
      isNotThisDecade: false,
    })
  }
  yearBox.unshift({ year: startYear - 1, isNotThisDecade: true })
  yearBox.push({ year: endYear + 1, isNotThisDecade: true })

  const list = chunk(yearBox, 3)
  const yearPickerRef = useRef<HTMLDivElement>()

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
  }, [])

  useLayoutEffect((): void => {
    if (!visible) {
      domAlign(yearPickerRef.current, container.current, {
        points: ['tl', 'bl'],
        overflow: { adjustX: 1, adjustY: 1 },
        targetOffset: [0, 0],
        offset: [0, 6],
      })
    }
  }, [visible])

  const handleSelect = useCallback(
    (index: number): void => {
      onChange(yearBox[index].year)
    },
    [yearBox],
  )

  const handleNextDecade = useCallback((): void => {
    setStartYear(+Big(startYear).plus(YEAR_DECADE))
  }, [startYear])

  const handlePrevDecade = useCallback((): void => {
    setStartYear(+Big(startYear).minus(YEAR_DECADE))
  }, [startYear])

  const handleShowCenturyPickerMenu = useCallback((): void => {
    setVisible(true)
  }, [])

  const handleChangeDecade = useCallback((startYear: number): void => {
    setStartYear(startYear)
    setVisible(false)
  }, [])

  if (visible) {
    return (
      <CenturyPickerMenu
        year={year}
        onChange={handleChangeDecade}
        container={container}
      />
    )
  }

  return (
    <div className='year-picker-menu' ref={yearPickerRef} onClick={handleClick}>
      <Flex
        className='year-picker-menu-header'
        justifyContent='spaceBetween'
        alignItems='center'>
        <LeftOutlined
          className='year-picker-menu-header-icon'
          onClick={handlePrevDecade}
        />
        <span
          className='year-picker-menu-header-button'
          onClick={handleShowCenturyPickerMenu}>
          {startYear}-{endYear}
        </span>
        <RightOutlined
          className='year-picker-menu-header-icon'
          onClick={handleNextDecade}
        />
      </Flex>
      <div className='year-picker-menu-content'>
        <table>
          <tbody>
            {list.map((tr, index) => (
              <tr key={index}>
                {tr.map((td, subIndex) => (
                  <td
                    onClick={(): void => handleSelect(index * 3 + subIndex)}
                    key={subIndex}
                    className={classNames('year-picker-menu-content-item', {
                      selected: year === td.year,
                      'is-not-this-decade': td.isNotThisDecade,
                    })}>
                    <div>{td.year}</div>
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

export default YearPickerMenu
