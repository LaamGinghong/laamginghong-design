import React, { Component, createRef, MouseEvent, MutableRefObject } from 'react'
import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import domAlign from 'dom-align'
import { chunk } from 'laamginghong-utils'
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '../../icon'
import { Flex, FlexItem } from '../../flex'
import { initDateBox, initMonth, initYear } from '../utils'
import MonthPickerMenu from '../month-picker/month-picker-menu'
import YearPickerMenu from '../year-picker/year-picker-menu'
import { Button } from '../../button'
import TimePickerMenu from '../time-picker/time-picker-menu'
import { DAYS } from '../constant'

export interface DatePickerMenuProps {
    value: Date
    onChange(date: Date, open?: boolean): void
    format: string
    disabledDate: (date: Date) => boolean
    showTime?: boolean
    showToday?: boolean
    container: MutableRefObject<HTMLDivElement>
}

interface DatePickerMenuState {
    dateBox: Dayjs[]
    year: number
    month: string
    yearVisible: boolean
    monthVisible: boolean
    timeVisible: boolean
}

class DatePickerMenu extends Component<DatePickerMenuProps, DatePickerMenuState> {
    state: DatePickerMenuState = {
        dateBox: initDateBox(this.props.value ?? new Date()),
        year: initYear(this.props.value ?? new Date()),
        month: initMonth(this.props.value ?? new Date()),
        yearVisible: false,
        monthVisible: false,
        timeVisible: false,
    }

    private _dateMenuRef = createRef<HTMLDivElement>()

    componentDidMount(): void {
        this._initPosition()
    }

    private _initPosition = (): void => {
        const { container } = this.props
        domAlign(this._dateMenuRef.current, container.current, {
            points: ['tl', 'bl'],
            overflow: { adjustX: 1, adjustY: 1 },
            targetOffset: [0, 0],
            offset: [0, 6],
        })
    }

    private _handleClick = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
    }

    private _initData = (value: Date): void => {
        this.setState({
            dateBox: initDateBox(value),
            year: initYear(value),
            month: initMonth(value),
        })
    }

    private _handelPrevMonth = (): void => {
        const { year, month } = this.state
        const value = new Date(year, +month - 2, 1)
        this._initData(value)
    }

    private _handleNextMonth = (): void => {
        const { year, month } = this.state
        const value = new Date(year, +month, 1)
        this._initData(value)
    }

    private _handlePrevYear = (): void => {
        const { year, month } = this.state
        const value = new Date(year - 1, +month - 1, 1)
        this._initData(value)
    }

    private _handleNextYear = (): void => {
        const { year, month } = this.state
        const value = new Date(year + 1, +month - 1, 1)
        this._initData(value)
    }

    private _handleSelect = ({ date, disabled }: { date: Dayjs; disabled: boolean }): void => {
        if (disabled) {
            return
        }
        const { onChange, showTime } = this.props
        onChange(date.toDate(), !!showTime)
    }

    private _handleClickOk = (): void => {
        const { value, onChange } = this.props
        onChange(value)
    }

    private _handleShowYearPicker = (): void => {
        this.setState({
            yearVisible: true,
        })
    }

    private _handleShowMonthPicker = (): void => {
        this.setState({
            monthVisible: true,
        })
    }

    private _handleShowTimePicker = (): void => {
        this.setState({ timeVisible: true })
    }

    private _handleSelectMonth = (date: Date): void => {
        this.setState(
            {
                dateBox: initDateBox(date),
                year: initYear(date),
                month: initMonth(date),
                monthVisible: false,
            },
            () => {
                this._initPosition()
            },
        )
    }

    private _handleSelectYear = (year: number): void => {
        const { month } = this.state
        const date = new Date(year, +month - 1)
        this.setState(
            {
                dateBox: initDateBox(date),
                year: initYear(date),
                month: initMonth(date),
                yearVisible: false,
            },
            () => {
                this._initPosition()
            },
        )
    }

    private _handleClickToday = (): void => {
        const { disabledDate, onChange } = this.props
        const today = new Date()
        const disabled = disabledDate(today)
        if (disabled) {
            return
        }
        onChange(today)
    }

    private _handleChangeTime = (date: Date): void => {
        this.setState(
            {
                timeVisible: false,
            },
            (): void => {
                const { onChange } = this.props
                onChange(date, true)
                this._initPosition()
            },
        )
    }

    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        const { dateBox, year, month, monthVisible, yearVisible, timeVisible } = this.state
        const { value, container, showToday, disabledDate, showTime } = this.props
        const dateList = dateBox.map((item) => {
            const disabled = disabledDate(item.toDate())
            return { date: item, disabled }
        })
        const list = chunk(dateList, 7)

        if (timeVisible) {
            return <TimePickerMenu time={value ?? new Date()} onChange={this._handleChangeTime} container={container} />
        }

        if (monthVisible) {
            return <MonthPickerMenu month={+month - 1} year={year} onSelect={this._handleSelectMonth} container={container} />
        }

        if (yearVisible) {
            return <YearPickerMenu year={year} onChange={this._handleSelectYear} container={container} />
        }

        return (
            <div className='date-picker-menu' onClick={this._handleClick} ref={this._dateMenuRef}>
                <Flex className='date-picker-menu-header' justifyContent='spaceBetween' alignItems='center'>
                    <DoubleLeftOutlined className='date-picker-menu-header-icon' onClick={this._handlePrevYear} />
                    <LeftOutlined className='date-picker-menu-header-icon' onClick={this._handelPrevMonth} />
                    <FlexItem flex={1}>
                        <Flex justifyContent='center'>
                            <span className='date-picker-menu-header-button' onClick={this._handleShowYearPicker}>
                                {year}年
                            </span>
                            <span className='date-picker-menu-header-button' onClick={this._handleShowMonthPicker}>
                                {month}月
                            </span>
                        </Flex>
                    </FlexItem>
                    <RightOutlined className='date-picker-menu-header-icon' onClick={this._handleNextMonth} />
                    <DoubleRightOutlined className='date-picker-menu-header-icon' onClick={this._handleNextYear} />
                </Flex>
                <div className='date-picker-menu-content'>
                    <table>
                        <thead>
                            <tr>
                                {DAYS.map((value) => (
                                    <th key={value}>{value}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((tr) => (
                                <tr key={JSON.stringify(tr)}>
                                    {tr.map((td) => (
                                        <td
                                            onClick={(): void => this._handleSelect(td)}
                                            key={td.date.toString()}
                                            className={classNames('date-picker-menu-content-item', {
                                                disabled: td.disabled,
                                                selected: dayjs(value ?? new Date()).isSame(td.date, 'date'),
                                                'not-this-month': !dayjs(new Date(year, +month - 1)).isSame(td.date, 'month'),
                                            })}>
                                            <div>{td.date.date()}</div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showTime && (
                    <Flex className='date-picker-menu-footer' justifyContent='spaceBetween'>
                        <Button type='link' style={{ paddingLeft: 0 }} onClick={this._handleClickToday}>
                            此刻
                        </Button>
                        <Flex justifyContent='end' alignItems='center'>
                            <Button type='link' onClick={this._handleShowTimePicker}>
                                选择时间
                            </Button>
                            <Button type='primary' size='small' style={{ fontSize: '14px' }} onClick={this._handleClickOk}>
                                确定
                            </Button>
                        </Flex>
                    </Flex>
                )}
                {!showTime && showToday && (
                    <div className='date-picker-menu-footer'>
                        <Button type='link' onClick={this._handleClickToday}>
                            今天
                        </Button>
                    </div>
                )}
            </div>
        )
    }
}

export default DatePickerMenu
