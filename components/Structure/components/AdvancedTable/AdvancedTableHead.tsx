import { Children, PropsWithChildren } from 'react';

export const sortType = {
  'MinortoMayor':1
}

interface Props {
  className?: string,
  defaultSort?: number,
  enableFiltering?: boolean,
  enableSorting?: boolean,
  enableGrouping?: boolean,
  defaultFilter?: Function
}

const AdvancedTableHead = (props: PropsWithChildren<Props>) => {

  return (
    <span style={{marginRight:'0.5em'}}>{props.children}</span>
  )
}

export default AdvancedTableHead