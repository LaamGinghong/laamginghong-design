import React, { ReactNode, useCallback, useState } from 'react'
import { Switch } from './index'
import { Radio } from '../radio'

const { Group } = Radio

export default { title: 'Switch' }

export const common = (): ReactNode => {
  const [checked, setChecked] = useState(false)

  const handleCheck = useCallback((checked: boolean): void => {
    setChecked(checked)
  }, [])

  return <Switch checked={checked} onChange={handleCheck} />
}

export const withText = (): ReactNode => {
  const [checked, setChecked] = useState(false)

  const handleCheck = useCallback((checked: boolean): void => {
    setChecked(checked)
  }, [])

  return (
    <Switch
      checked={checked}
      onChange={handleCheck}
      checkedText='是'
      unCheckedText='否'
    />
  )
}

export const disabled = (): ReactNode => {
  return (
    <>
      <div>
        <Switch checked onChange={null} disabled />
      </div>
      <div>
        <Switch checked={false} onChange={null} disabled />
      </div>
    </>
  )
}

export const size = (): ReactNode => {
  const [checked, setChecked] = useState(false)
  const [size, setSize] = useState<'small'>()

  const handleCheck = useCallback((checked: boolean): void => {
    setChecked(checked)
  }, [])

  const handleChange = useCallback((value: 'small'): void => {
    setSize(value)
  }, [])

  return (
    <>
      <Group
        value={size}
        options={[
          { value: 'small', label: 'small' },
          { value: null, label: 'default' },
        ]}
        onChange={handleChange}
        block
      />
      <Switch
        checked={checked}
        size={size}
        onChange={handleCheck}
        checkedText='是'
        unCheckedText='否'
      />
    </>
  )
}

export const loading = (): ReactNode => {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCheck = useCallback((checked: boolean): void => {
    setChecked(checked)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return <Switch checked={checked} onChange={handleCheck} loading={loading} />
}
