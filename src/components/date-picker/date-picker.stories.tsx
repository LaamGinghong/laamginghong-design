import React, { FC, useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, MonthPicker, YearPicker, TimePicker } from './index'

export default { title: 'DatePicker' }

export const Common: FC = () => {
    return (
        <div>
            <DatePicker allowClear placeholder='date picker' />
            <br />
            <MonthPicker placeholder='month picker' allowClear />
            <br />
            <YearPicker allowClear placeholder='year picker' />
            <br />
            <TimePicker placeholder='time picker' allowClear />
        </div>
    )
}

export const Control: FC = () => {
    const [date, setDate] = useState<Date>()

    return (
        <div>
            <DatePicker
                value={date}
                onChange={setDate}
                allowClear
                placeholder='date picker'
            />
            <br />
            <MonthPicker
                value={date}
                onChange={setDate}
                placeholder='month picker'
                allowClear
            />
            <br />
            <YearPicker
                value={date}
                onChange={setDate}
                allowClear
                placeholder='year picker'
            />
            <br />
            <TimePicker
                value={date}
                onChange={setDate}
                placeholder='time picker'
                allowClear
            />
        </div>
    )
}

export const Format: FC = () => {
    const [date, setDate] = useState(new Date())

    const handleChangeDate = useCallback((date: Date): void => {
        setDate(date)
    }, [])

    return (
        <DatePicker
            value={date}
            onChange={handleChangeDate}
            allowClear
            format='YYYY-MM-DD HH:mm:ss'
        />
    )
}

export const Disabled: FC = () => {
    const [date, setDate] = useState<Date>()

    const handleChangeDate = useCallback((date: Date): void => {
        setDate(date)
    }, [])

    return (
        <div>
            <DatePicker
                value={date}
                onChange={handleChangeDate}
                disabled
                placeholder='date picker'
            />
            <br />
            <MonthPicker
                value={date}
                onChange={handleChangeDate}
                disabled
                placeholder='month picker'
            />
            <br />
            <YearPicker
                value={date}
                onChange={handleChangeDate}
                disabled
                placeholder='year picker'
            />
            <br />
            <TimePicker
                value={date}
                onChange={handleChangeDate}
                disabled
                placeholder='time picker'
            />
        </div>
    )
}

export const ShowTime: FC = () => {
    const [date, setDate] = useState(new Date())

    const handleChangeDate = useCallback((date: Date): void => {
        setDate(date)
    }, [])

    return (
        <DatePicker
            value={date}
            onChange={handleChangeDate}
            allowClear
            format='YYYY-MM-DD HH:mm:ss'
            showTime
        />
    )
}

export const DisabledDate: FC = () => {
    const [date, setDate] = useState(new Date())

    const handleChangeDate = useCallback((date: Date): void => {
        setDate(date)
    }, [])

    return (
        <DatePicker
            value={date}
            onChange={handleChangeDate}
            disabledDate={(date: Date): boolean =>
                dayjs(date).isAfter(new Date())
            }
            allowClear
            format='YYYY-MM-DD'
        />
    )
}
