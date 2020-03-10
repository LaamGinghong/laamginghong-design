import React, { ReactNode, useCallback, useState } from 'react'
import Radio from './radio'
import { Button } from '../button'

export default { title: 'Radio' }

export const common = (): ReactNode => {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Radio checked={checked} value={'Apple'} onChecked={setChecked}>
        苹果
      </Radio>
    </>
  )
}

export const disabled = (): ReactNode => {
  const [disabled, setDisabled] = useState(false)

  const handleToggle = useCallback((): void => {
    setDisabled(!disabled)
  }, [disabled])

  return (
    <>
      <Radio checked value='apple' onChecked={null} disabled={disabled}>
        Apple
      </Radio>
      <Radio
        checked={false}
        value='watermelon'
        onChecked={null}
        disabled={disabled}>
        WaterMelon
      </Radio>
      <br />
      <Button type='primary' onClick={handleToggle}>
        toggle disabled
      </Button>
    </>
  )
}

export const group = (): ReactNode => {
  const [selected, setSelected] = useState<number>()

  const handleSelect = useCallback((value: number): void => {
    setSelected(value)
  }, [])

  const { Group } = Radio

  return (
    <Group
      value={selected}
      onChange={handleSelect}
      options={[
        { value: 1, label: '苹果' },
        { value: 2, label: '雪梨' },
      ]}
    />
  )
}

export const block = (): ReactNode => {
  const [selected, setSelected] = useState<number>()

  const handleSelect = useCallback((value: number): void => {
    setSelected(value)
  }, [])

  const { Group } = Radio

  return (
    <Group
      block
      value={selected}
      onChange={handleSelect}
      options={[
        { value: 1, label: '苹果' },
        { value: 2, label: '雪梨' },
      ]}
    />
  )
}
