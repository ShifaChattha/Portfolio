import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { SocialIcon } from '../TechIcon/TechIcon';

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  background: ${props => props.$scrolled 
    ? '#566a88' 
    : props.theme.colors.gradients.primary
  };
  padding: ${props => props.theme.spacing.sm} 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${props => props.$scrolled 
    ? props.theme.shadows.heavy 
    : props.theme.shadows.medium
  };
  transition: all 0.3s ease;
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  text-decoration: none;
  z-index: 1001;
  position: relative;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
`;

const LogoIcon = styled.span`
  font-size: 1.5rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.3s ease;
  font-weight: ${props => props.$isActive ? '700' : '500'};
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  display: block;
  position: relative;
  z-index: 1001;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GitHubLink = styled.a`
  color: white;
  font-size: 1.4rem;
  padding: ${props => props.theme.spacing.xs};
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
  z-index: 1001;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

// const HeaderActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${props => props.theme.spacing.md};
  
//   @media (max-width: ${props => props.theme.breakpoints.tablet}) {
//     gap: ${props => props.theme.spacing.sm};
//   }
// `;
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  /* This is the magic line that hides the desktop toggle on small screens */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.xs};
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  z-index: 1002;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(74, 111, 165, 0.98);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.lg};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 999;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  width: 100%;
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.$isActive ? '700' : '500'};
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  text-align: center;
  transition: all 0.3s ease;
  display: block;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const MobileGitHubLink = styled.a`
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  transition: all 0.3s ease;
  display: block;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" style={{position: 'absolute', left: '-9999px', zIndex: 1002, color: 'white', padding: '8px', background: '#4a6fa5', textDecoration: 'none'}} 
         onFocus={(e) => e.currentTarget.style.left = '8px'} 
         onBlur={(e) => e.currentTarget.style.left = '-9999px'}>
        Skip to main content
      </a>
      <HeaderContainer $scrolled={scrolled}>
        <Nav>
          <LogoContainer to="/" onClick={closeMobileMenu} aria-label="Saadi - Home">
            {/* <LogoIcon>⚡</LogoIcon> */}
            <Logo>Shifa</Logo>
          </LogoContainer>
          
          <NavList role="navigation" aria-label="Main navigation">
            {navItems.map(item => (
              <NavItem key={item.path}>
                <NavLink 
                  to={item.path} 
                  $isActive={location.pathname === item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>

          {/* <HeaderActions>
            <SocialLinks>
              <SocialLink 
                href="https://github.com/saadi-js" 
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
              >
                <SocialIcon platform="github" size={20} />
              </SocialLink>
              <SocialLink 
                href="https://www.linkedin.com/in/saad-chattha-568901263/" 
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
              >
                <SocialIcon platform="linkedin" size={20} />
              </SocialLink>
            </SocialLinks>
            <DarkModeToggle />
          </HeaderActions> */}
          <HeaderActions>
  <SocialLinks>
    <SocialLink 
      href="https://github.com/ShifaChattha" 
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub Profile"
    >
      <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </SocialLink>
    
    <SocialLink 
      href="https://www.linkedin.com/in/shifa-chattha-364172398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
      target="_blank"
      rel="noopener noreferrer"
      title="LinkedIn Profile"
    >
      <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </SocialLink>
  </SocialLinks>
  
  <DarkModeToggle />
</HeaderActions>

          <MobileMenuButton 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      <MobileMenu $isOpen={mobileMenuOpen} role="navigation" aria-label="Mobile navigation">
        <MobileNavList>
          {navItems.map(item => (
            <MobileNavItem key={item.path}>
              <MobileNavLink 
                to={item.path} 
                $isActive={location.pathname === item.path}
                onClick={closeMobileMenu}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </MobileNavLink>
            </MobileNavItem>
          ))}
          {/* <MobileNavItem>
            <MobileGitHubLink 
              href="https://github.com/saadi-js" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              🐙 GitHub
            </MobileGitHubLink>
          </MobileNavItem> */}
          <MobileNavItem style={{ marginTop: '20px', borderTop: '1px solid #112240', paddingTop: '20px' }}>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', alignItems: 'center' }}>
    {/* Professional GitHub Link */}
    <a 
      href="https://github.com/ShifaChattha" 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={closeMobileMenu}
      style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
    >
      <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>

    {/* Dark Mode Toggle inside the Hamburger */}
    <DarkModeToggle />

    {/* Professional LinkedIn Link */}
    <a 
      href="https://www.linkedin.com/in/shifa-chattha-364172398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={closeMobileMenu}
      style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
    >
      <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>
  </div>
</MobileNavItem>
        </MobileNavList>
      </MobileMenu>
    </>
  );
};

export default Header;