import React, { FC, useState } from 'react'
import Checkbox from './checkbox'

export default { title: 'Checkbox' }

export const Common: FC = () => {
    const [checked, setChecked] = useState(false)

    return (
        <Checkbox
            checked={checked}
            indeterminate
            disabled
            onChange={(event): void => setChecked(event.target.checked)}
            id='apple'>
            苹果
        </Checkbox>
    )
}
