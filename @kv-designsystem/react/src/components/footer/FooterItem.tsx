import { forwardRef } from 'react';

export type FooterItemProps = React.HTMLAttributes<HTMLLIElement>;

// Listeelementene kan være av valgfri type, eks. ren tekst, lenker, heading.
export const FooterItem = forwardRef<HTMLLIElement, FooterItemProps>(
  // children: alt innholdet som ligger i <Footer.Item>...</Footer.Item>
  function FooterItem({ children, ...rest }, ref) {
    return (
      <li 
        className='footer-item'
        ref={ref} 
        {...rest}
      >
        {children}
      </li>
    );
  }
);
