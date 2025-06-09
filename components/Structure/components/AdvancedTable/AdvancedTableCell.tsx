import { Children, ReactNode, PropsWithChildren  } from 'react';

interface Props {
  accessor: string
  className?: string
  valueEditFunction?: Function
  sortingFunction?: (valueA: any, valueB: any) => -1 | 0 | 1
}

const AdvancedTableCell = (props: PropsWithChildren<Props>) => ""

export default AdvancedTableCell