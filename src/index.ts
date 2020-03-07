import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ModalProps, Modal } from './components/modal'
import { ButtonProps, Button } from './components/button'
import { FlexItemProps, FlexProps, FlexItem, Flex } from './components/flex'
import { List, ListItem, ListItemProps, ListProps } from './components/list'
import { message, MessageProps } from './components/message'
import {
  notification,
  NotificationCreateConfig,
} from './components/notification'
import { Input } from './components/input'
import { SwitchProps, Switch } from './components/switch'
import { TabsProps, Tabs } from './components/tabs'
import { BreadcrumbsProps, Breadcrumbs } from './components/breadcrumbs'
import { Popover, PopoverProps, PopoverClose } from './components/popover'
import { Select, SelectProps } from './components/select'
import { Pagination, PaginationProps } from './components/pagination'
import { InputNumber, InputNumberProps } from './components/input-number'
import { DividerProps, Divider } from './components/divider'
import { DrawerProps, Drawer } from './components/drawer'
import {
  RadioProps,
  Radio,
  RadioGroupProps,
  RadioGroup,
} from './components/radio'
import {
  CheckboxProps,
  CheckboxGroup,
  CheckboxGroupProps,
  Checkbox,
} from './components/checkbox'
import { DatePickerProps, DatePicker } from './components/date-picker'

dayjs.locale('zh-cn')

export {
  Modal,
  ModalProps,
  Button,
  ButtonProps,
  FlexItem,
  FlexProps,
  FlexItemProps,
  Flex,
  ListItemProps,
  ListProps,
  ListItem,
  List,
  message,
  MessageProps,
  notification,
  NotificationCreateConfig,
  Input,
  SwitchProps,
  Switch,
  TabsProps,
  Tabs,
  BreadcrumbsProps,
  Breadcrumbs,
  Popover,
  PopoverProps,
  PopoverClose,
  SelectProps,
  Select,
  InputNumber,
  InputNumberProps,
  PaginationProps,
  Pagination,
  DividerProps,
  Divider,
  DrawerProps,
  Drawer,
  RadioProps,
  Radio,
  RadioGroupProps,
  RadioGroup,
  CheckboxGroupProps,
  CheckboxGroup,
  CheckboxProps,
  Checkbox,
  DatePicker,
  DatePickerProps,
}
