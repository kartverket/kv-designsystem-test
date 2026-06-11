import cl from 'clsx/lite';
import { forwardRef, HTMLAttributes } from 'react';
import './Footer.css';
import logo from '../../../assets/img/KV_Logo_Horisontal.svg';

/*
Hovedkomponenten, fungerer som en container for hele footeren. 
Den kan ta inn children (alt innhold), og vi kan angi maxWidth for å holde innholdet på ønsket bredde.
*/

export type FooterProps = HTMLAttributes<HTMLElement>;

/* 
forwardRef: gjør at andre komponenter kan få referenase til <footer>-elementet
children: gjør at vi kan sette FooterList og andre elementer inni footeren
maxWidth: begrenser bredden på innholdet for å matche layouten på resten av siden
className + Footer.css: gjør at vi kan style footeren
*/
export const Footer = forwardRef<HTMLElement, FooterProps>(
  function Footer({ children, className, ...rest }, ref) {
  return (
    <footer
      className={cl('footer', className)}
      ref={ref}
      {...rest}
    >
      <div className='footer-container'>
        <a href='https://kartverket.no'>
          <img src={logo} alt='Kartverket logo' className='footer-logo' />
        </a>
        <div className='footer-columns'>
          {children}
        </div>
      </div>
    </footer>
  );
});
