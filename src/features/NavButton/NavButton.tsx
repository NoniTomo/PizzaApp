import { NavLink } from 'react-router-dom'
import type { Icon, IconProps } from '@tabler/icons-react'

type NavButtonProps = {
  to: string
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
  text?: string
  type?: 'column' | 'row'
}

export const NavButton = ({ to, Icon, text, type = 'column', ...props }: NavButtonProps) => (
  <NavLink
    to={to}
    className={`my-1 items-center justify-center rounded-lg px-2 hover:bg-slate-100 hover:bg-opacity-15 ${type === 'row' ? 'flex flex-row gap-2' : 'flex flex-col'}`}
    {...props}
  >
    {({ isActive }) => (
      <>
        {isActive ? (
          <>
            <Icon size="30" className="text-secondary-color" />
            {text && <p className="text-secondary-color">{text}</p>}
          </>
        ) : (
          <>
            <Icon size="30" className="text-gray-200" />
            {text && <p className="text-gray-200">{text}</p>}
          </>
        )}
      </>
    )}
  </NavLink>
)
/* 
@import '../../../styles/variables.scss';
import { Button } from '@/shared/components'

.button {
  margin: 5px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  border: none;
  width: 5rem;
  transition: $transition;

  &:hover {
    background-color: $bg-secondary;
    border-radius: 40%;
  }

  .text {
    font-family: $font-family;
    font-size: $font-size-small;
    font-weight: 300;
    width: 100%;
    text-align: center;
    color: #637083;
  
    &_active {
      color: $footer-purple
    }
  }
}

.link {
  text-decoration: none;
}
 */
