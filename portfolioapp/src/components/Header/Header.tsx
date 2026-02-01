import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { SocialIcon } from '../TechIcon/TechIcon';

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  background: ${props => props.$scrolled 
    ? 'rgba(102, 126, 234, 0.95)' 
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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.sm};
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
            <LogoIcon>⚡</LogoIcon>
            <Logo>Saadi</Logo>
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

          <HeaderActions>
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
              <SocialLink 
                href="mailto:your.email@example.com" 
                title="Email"
              >
                <SocialIcon platform="email" size={20} />
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
          <MobileNavItem>
            <MobileGitHubLink 
              href="https://github.com/saadi-js" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              🐙 GitHub
            </MobileGitHubLink>
          </MobileNavItem>
        </MobileNavList>
      </MobileMenu>
    </>
  );
};

export default Header;