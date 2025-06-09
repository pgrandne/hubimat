import { Children, PropsWithChildren, ReactNode } from 'react';

export const sortType = {
  'MinortoMayor':1
}

interface Props {
  accessor: string,
  hidden?: boolean,
  className?: string,
  // defaultSort?: number,
  enableFiltering?: boolean,
  enableSorting?: boolean,
  enableGrouping?: boolean,
  // defaultFilter?: Function,
  displayValueFunction?: Function
  icon?: ReactNode
}

const AdvancedTableHead = (props: PropsWithChildren<Props>) => ""

export default AdvancedTableHead