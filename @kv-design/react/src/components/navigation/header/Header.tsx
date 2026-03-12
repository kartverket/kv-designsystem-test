// import { forwardRef, type HTMLAttributes } from 'react';
// import type { CSSProperties } from 'react';
// import type { Size } from '@digdir/designsystemet-types';
// import { Heading } from '../../typography/heading/Heading';

// export type HeaderProps = HTMLAttributes<HTMLElement> & {
//   /**
//    * The name of the application, displayed in the header.
//    */
//   applicationName: 'Kartverket' | (string & {});
//   /**
//    * The URL the header logo links to. Set to `null` to disable the link.
//    * @default '/' (root of the site)
//    */
//   href?: string | null;
//   /**
//    * The maximum width of the header content.
//    * Can be any valid CSS width value, e.g. `1280px`, `100%`, etc.
//    * @default '80rem'
//    */
//   maxWidth?: string;
//   /**
//    * Whether the header should stick to the top of the screen.
//    * @default true
//    */
//   sticky?: boolean;
//   /**
//    * Changes size for descendant Designsystemet components. Select from predefined sizes.
//    */
//   'data-size'?: Size;
// };

// export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
//   {
//     applicationName,
//     children,
//     className,
//     href = '/',
//     maxWidth = '80rem',
//     sticky = true,
//     ...rest
//   },
//   ref,
// ) {
//   const isMain = applicationName === 'Utdanningsdirektoratet';
//   const LogoContainer = href !== null ? 'a' : 'div';

//   return (
//     <header
//       className={`uds-header ${className}`}
//       ref={ref}
//       style={{ '--udsc-header-max-width': maxWidth } as CSSProperties}
//       {...rest}
//     >
//       <div>
//         <LogoContainer href={href as string} className="uds-header__logo">
//           {isMain ? <Logo padding="0" /> : <LogoSymbol padding="0" />}
//           {!isMain && (
//             <Heading data-size="xs" asChild>
//               <span>{applicationName}</span>
//             </Heading>
//           )}
//         </LogoContainer>
//         {children && <div className="uds-header__content">{children}</div>}
//       </div>
//     </header>
//   );
// });