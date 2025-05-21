import { Children, ReactNode, PropsWithChildren  } from 'react';

interface Props {
  className?: string
}

const AdvancedTableCell = (props: PropsWithChildren<Props>) => {

  return (
    <span style={{marginRight:'0.5em'}}>{props.children}</span>
  )
}

export default AdvancedTableCell