import React, { ReactNode, useCallback, useState } from 'react'
import { DatePicker, MonthPicker, YearPicker, TimePicker } from './index'
import dayjs = require('dayjs')

export default { title: 'DatePicker' }

export const common = (): ReactNode => {
  const [date, setDate] = useState()

  const handleChangeDate = useCallback((date: Date): void => {
    setDate(date)
  }, [])

  return (
    <div>
      <DatePicker
        value={date}
        onChange={handleChangeDate}
        allowClear
        placeholder='date picker'
      />
      <br />
      <MonthPicker
        value={date}
        onChange={handleChangeDate}
        placeholder='month picker'
        allowClear
      />
      <br />
      <YearPicker
        value={date}
        onChange={handleChangeDate}
        allowClear
        placeholder='year picker'
      />
      <br />
      <TimePicker
        value={date}
        onChange={handleChangeDate}
        placeholder='time picker'
        allowClear
      />
    </div>
  )
}

export const format = (): ReactNode => {
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

export const disabled = (): ReactNode => {
  const [date, setDate] = useState()

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

export const showTime = (): ReactNode => {
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

export const disabledDate = (): ReactNode => {
  const [date, setDate] = useState(new Date())

  const handleChangeDate = useCallback((date: Date): void => {
    setDate(date)
  }, [])

  return (
    <DatePicker
      value={date}
      onChange={handleChangeDate}
      disabledDate={(date: Date): boolean => dayjs(date).isAfter(new Date())}
      allowClear
      format='YYYY-MM-DD'
    />
  )
}
