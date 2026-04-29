import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import './Header.css';
import { HeaderBrand } from './HeaderBrand';
import { Button } from '../button/Button';

type CollapseStage = 'hideNone' | 'hideNavList' | 'hideAll';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The name of the application, displayed in the header.
   */
  applicationName?: string;
  /**
   * The URL applicationName links to. Set to `null` to disable the link.
   */
  applicationHref?: string | null;
};

type Measurements = {
  brandWidth: number;
  navWidth: number;
  actionsWidth: number;
  hamburgerWidth: number;
  containerGapWidth: number;
  navGapWidth: number;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { applicationHref, applicationName, children, className,  ...rest},
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [stage, setStage] = useState<CollapseStage>('hideNone');
  const [measurements, setMeasurements] = useState<Measurements | null>(null);

  useEffect(() => {
    const measureAll = () => {
      requestAnimationFrame(() => {
        if (!containerRef.current || !navRef.current) return;

        const brandWidth = brandRef.current?.offsetWidth ?? 0;
        const navWidth = navRef.current?.offsetWidth ?? 0;
        const actionsWidth = actionsRef.current?.offsetWidth ?? 0;
        const hamburgerWidth = hamburgerRef.current?.offsetWidth ?? 0;
        const containerGapWidth = parseFloat(getComputedStyle(containerRef.current).gap);
        
        const navChildCount = navRef.current.children.length ?? 0;
        const navGapSize = parseFloat(getComputedStyle(navRef.current).gap) ?? 0;
        const navGapWidth = Math.max(0, navChildCount - 1) * navGapSize;

        setMeasurements({
          brandWidth,
          navWidth,
          actionsWidth,
          hamburgerWidth,
          containerGapWidth,
          navGapWidth
        });

        console.log('Measurements captured:');
        console.log('brandWidth:', brandWidth);
        console.log('navWidth:', navWidth);
        console.log('actionsWidth:', actionsWidth);
        console.log('hamburgerWidth:', hamburgerWidth);
        console.log('containerGapWidth:', containerGapWidth);
        console.log('navGapWidth:', navGapWidth);
      });
    };

    const observer = new ResizeObserver(measureAll);
    if (brandRef.current) observer.observe(brandRef.current);

    measureAll();

    return () => {
      observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!measurements) return;

    const calculate = () => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        // henter bredden på elementet (inkluderer padding)
        const containerWidth = containerRef.current.clientWidth;

        console.log('containerWidth:', containerWidth);

        const hideNone = 
          measurements.brandWidth + 
          measurements.navWidth + 
          measurements.containerGapWidth <= 
          containerWidth;

        const hideNavList = 
          measurements.brandWidth + 
          measurements.actionsWidth + 
          measurements.hamburgerWidth + 
          measurements.containerGapWidth + 
          measurements.navGapWidth <= 
          containerWidth;

        if (hideNone) {
          setStage('hideNone');
        } else if (hideNavList) {
          setStage('hideNavList');
        } else {
          setStage('hideAll');
        }


      });
    };

    // observerer containerRef.current og kaller funksjonen calculate når den endrer størrelse
    // const observer = new ResizeObserver( () => {calculate()});
    const observer = new ResizeObserver(calculate);
    if (containerRef.current) observer.observe(containerRef.current);

    // manual initial run
    calculate();
    
    return () => {
      observer.disconnect();
    }
  }, [measurements]);

  let navList: React.ReactNode = null;
  let actions: React.ReactNode = null;

  (Array.isArray(children) ? children : [children]).forEach((child: any) => {
    if (!child) return;

    if (child.type?.displayName === 'Header.NavList') {
      navList = child;
    } else if (child.type?.displayName === 'Header.Actions') {
      actions = child;
    } 
  });

  return (
    <header className={`header ${className ?? ''}`} ref={ref} {...rest}>
      <div className='header-container' ref={containerRef}>

        <HeaderBrand
          applicationName={applicationName}
          applicationHref={applicationHref}
          ref={brandRef}
        />

        <nav className='header-nav' ref={navRef}>
          {/* NAV */}
          <div className={`header-nav-list-wrapper ${stage !== 'hideNone' ? 'hidden' : ''}`} >
            {navList}
          </div>

          {/* ACTIONS */}
          <div ref={actionsRef} style={{display: 'flex'}}>
            {stage === 'hideNavList' || stage === 'hideNone' ? actions : null}
          </div>

          {/* HAMBURGERMENU */}
          <Button 
            variant='secondary' 
            ref={hamburgerRef}
            className={`${stage === 'hideNone' ? 'hidden' : ''}`}
            // style={{ visibility: stage === 'hideNone' ? 'hidden' : 'visible' }}
          >
            Meny
          </Button>
          {/* {stage === 'hideAll' ? (
            // <HamburgerMenu navList={navList} actions={actions} />
            <Button variant='secondary' ref={hamburgerRef}>Meny</Button>
          ) : stage === 'hideNavList' ? (
            // <HamburgerMenu navList={navList} />
            <Button variant='secondary' ref={hamburgerRef}>Meny</Button>
          ) : null } */}
          
          {/* Lage HeaderMenu */}
        </nav>
      </div>
    </header>
  )
});
