import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button<{ $isDark: boolean }>`
  position: relative;
  width: 60px;
  height: 32px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #eaebec 0%, #818791 100%)' 
    : 'linear-gradient(135deg, #9fb8c9 0%, #cecbdf 100%)'
  };
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const ToggleCircle = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 4px;
  left: ${props => props.$isDark ? '32px' : '4px'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$isDark ? '#f8f9fa' : 'white'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled.div<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#dad5e7' : '#2c3e50'};
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DarkModeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton 
      onClick={toggleTheme} 
      $isDark={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* <ToggleCircle $isDark={isDark}>
        <IconWrapper $isDark={isDark}>
          {isDark ? '🌙' : '☀️'}
        </IconWrapper>
      </ToggleCircle> */}
      <ToggleCircle $isDark={isDark}>
  <IconWrapper $isDark={isDark}>
    {isDark ? (
      /* Moon Icon for Dark Mode */
      <svg height="14" width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ) : (
      /* Sun Icon for Light Mode */
      <svg height="14" width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    )}
  </IconWrapper>
</ToggleCircle>
    </ToggleButton>
  );
};

export default DarkModeToggle;