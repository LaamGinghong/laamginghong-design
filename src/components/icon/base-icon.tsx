import { FC } from 'react'
import type { IconBaseProps } from '@ant-design/icons/es/components/Icon'
import create from '@ant-design/icons/es/components/IconFont'

const BaseIcon: FC<IconBaseProps & { type: string }> = create({
  scriptUrl: '//at.alicdn.com/t/font_1646381_ko4ikg8cp6a.js',
  extraCommonProps: {
    style: { fontSize: '45px' },
  },
})

export default BaseIcon
