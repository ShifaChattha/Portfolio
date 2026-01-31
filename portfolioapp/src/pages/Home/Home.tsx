import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import { 
  typewriter,
  gradientShift,
  floatAnimation,
  staggeredFadeIn,
  hoverLift 
} from '../../styles/animations';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  color: white;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${floatAnimation} 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    animation: ${floatAnimation} 8s ease-in-out infinite reverse;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  z-index: 2;
  position: relative;
`;

const Greeting = styled.div`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  opacity: 0;
  ${staggeredFadeIn(0.2)};
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 700;
  opacity: 0;
  ${staggeredFadeIn(0.4)};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.8rem;
  }
`;

const TypewriterContainer = styled.div`
  height: 60px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled.h2<{ isTyping: boolean }>`
  font-size: 1.8rem;
  font-weight: 400;
  opacity: 0.95;
  overflow: hidden;
  border-right: ${props => props.isTyping ? '3px solid white' : 'none'};
  white-space: nowrap;
  margin: 0 auto;
  animation: ${props => props.isTyping ? typewriter : 'none'} 3s steps(40, end);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  ${staggeredFadeIn(1.5)};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  ${staggeredFadeIn(2)};
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1.1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
  backdrop-filter: blur(10px);
  font-weight: 500;
  ${hoverLift};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SocialLinks = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  opacity: 0;
  ${staggeredFadeIn(2.5)};
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.xs};
  
  &:hover {
    color: white;
    transform: translateY(-3px) scale(1.2);
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    "AI Engineer",
    "Django Developer", 
    "Machine Learning Specialist",
    "RAG Systems Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev: number) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    navigate('/projects');
  };

  const viewAbout = () => {
    navigate('/about');
  };

  return (
    <>
      <SEO 
        title="Home"
        description="AI Engineer and Django developer specializing in RAG systems, LangChain, and machine learning. Building intelligent AI-powered applications."
        keywords="AI Engineer, Django Developer, RAG Systems, LangChain, Machine Learning, Python, AI Applications"
      />
      <HomeContainer id="main-content">
      <BackgroundElements aria-hidden="true" />
      <HeroContent>
        <header>
          <Greeting>👋 Hello, I'm</Greeting>
          <Title>Saadi</Title>
          <TypewriterContainer>
            <Subtitle isTyping={isTyping} role="heading" aria-level={2}>
              {roles[currentRole]}
            </Subtitle>
          </TypewriterContainer>
        </header>
        <Description>
          AI Engineer and Django developer creating intelligent solutions with expertise in 
          RAG systems, LangChain, and machine learning. I build AI-powered applications that 
          leverage cutting-edge technologies to solve complex problems.
        </Description>
        <nav aria-label="Main actions">
          <ButtonContainer>
            <CTAButton onClick={scrollToProjects} aria-describedby="projects-description">
              View My Work
            </CTAButton>
            <SecondaryButton onClick={viewAbout}>
              About Me
            </SecondaryButton>
          </ButtonContainer>
        </nav>
        <aside>
          <SocialLinks aria-label="Social media links">
            <SocialLink href="https://github.com/saadi-js" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
              🐙
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/saad-chattha-568901263/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
              💼
            </SocialLink>
            <SocialLink href="mailto:your.email@example.com" title="Email Contact">
              📧
            </SocialLink>
          </SocialLinks>
        </aside>
      </HeroContent>
      <div id="projects-description" style={{position: 'absolute', left: '-9999px'}}>Navigate to projects page to view portfolio work</div>
    </HomeContainer>
    </>
  );
};

export default Home;