const lightTheme = {
  colors: {
    primary: '#4a6fa5',
    secondary: '#7a8b99',
    success: '#5a9c6b',
    danger: '#c85a5a',
    warning: '#d4a574',
    info: '#6b9dc4',
    light: '#fafbfc',
    dark: '#2c3e50',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2c3e50',
    textLight: '#6c7b7f',
    textSecondary: '#95a5a6',
    textInverse: '#ffffff',
    border: '#e8eaed',
    accent: '#3d5a80',
    muted: '#f4f6f8',
    gradients: {
      primary: 'linear-gradient(135deg, #667c9b 0%, #7a8b99 50%, #8fa4b3 100%)',
      secondary: 'linear-gradient(135deg, #c4d3e0 0%, #b8c6d3 50%, #a8b7c4 100%)',
      hero: 'linear-gradient(135deg, #6b7c95 0%, #7a8b99 25%, #8fa4b3 50%, #9bb0c4 75%, #a8bccf 100%)',
      subtle: 'linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%)',
    }
  },
  
  
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    large: '1200px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  shadows: {
    light: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    heavy: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  }
};

const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0f1419',
    surface: '#1a202c',
    text: '#e2e8f0',
    textLight: '#a0aec0',
    textSecondary: '#718096',
    textInverse: '#2d3748',
    border: '#2d3748',
    light: '#2d3748',
    dark: '#0a0e14',
    accent: '#4299e1',
    muted: '#1a202c',
    gradients: {
      primary: 'linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)',
      secondary: 'linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #5a6a7a 100%)',
      hero: 'linear-gradient(135deg, #1a202c 0%, #2d3748 25%, #4a5568 50%, #5a6a7a 75%, #6b7c8c 100%)',
      subtle: 'linear-gradient(135deg, #0f1419 0%, #1a202c 100%)',
    }
  },
  shadows: {
    light: '0 2px 4px rgba(0, 0, 0, 0.4)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.6)',
    heavy: '0 8px 16px rgba(0, 0, 0, 0.8)',
  },
};

export { lightTheme, darkTheme };
export default lightTheme;