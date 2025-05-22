import { Children, ReactNode, PropsWithChildren  } from 'react';

interface Props {
  className?: string
  valueEditFunction?: Function
  sortingFunction?: (valueA: any, valueB: any) => -1 | 0 | 1
}

const AdvancedTableCell = (props: PropsWithChildren<Props>) => {

  return (
    <span style={{marginRight:'0.5em'}}>{props.children}</span>
  )
}

export default AdvancedTableCell