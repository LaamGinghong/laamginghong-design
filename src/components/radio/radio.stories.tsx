import React, { ReactNode, useCallback, useState } from 'react'
import { Radio, RadioGroup } from './index'

export default { title: 'Radio' }

export const common = (): ReactNode => {
  return (
    <>
      <Radio checked value={1} onChecked={null}>
        苹果
      </Radio>
      <Radio checked={false} value={2} onChecked={null}>
        雪梨
      </Radio>
    </>
  )
}

export const group = (): ReactNode => {
  const [checked, setChecked] = useState(1)

  const handleCheck = useCallback((value: number): void => {
    setChecked(value)
  }, [])

  return (
    <RadioGroup
      value={checked}
      onChange={handleCheck}
      options={[
        { value: 1, label: '苹果' },
        { value: 2, label: '雪梨' },
      ]}
    />
  )
}

export const block = (): ReactNode => {
  const [checked, setChecked] = useState(1)

  const handleCheck = useCallback((value: number): void => {
    setChecked(value)
  }, [])

  return (
    <RadioGroup
      value={checked}
      onChange={handleCheck}
      block
      options={[
        { value: 1, label: '苹果' },
        { value: 2, label: '雪梨' },
      ]}
    />
  )
}

export const disabled = (): ReactNode => {
  const [checked, setChecked] = useState(1)

  const handleCheck = useCallback((value: number): void => {
    setChecked(value)
  }, [])

  return (
    <div>
      <div>
        <RadioGroup
          value={checked}
          onChange={handleCheck}
          disabled
          options={[
            { value: 1, label: '苹果' },
            { value: 2, label: '雪梨' },
          ]}
        />
      </div>
      <Radio checked value={3} onChecked={null} disabled>
        Single
      </Radio>
    </div>
  )
}
