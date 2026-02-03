import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
  background: ${props => props.theme.colors.gradients.hero};
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  color: white;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  /* Subtle overlay for better text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 50%;
    animation: ${floatAnimation} 6s ease-in-out infinite;
    filter: blur(1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 50%;
    animation: ${floatAnimation} 8s ease-in-out infinite reverse;
    filter: blur(2px);
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  z-index: 3;
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

const EmailContact = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
  opacity: 0;
  ${staggeredFadeIn(3)};
`;

const EmailText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const EmailAddress = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
  font-family: 'Courier New', monospace;
  
  /* Typewriter animation like skills section */
  overflow: hidden;
  border-right: 3px solid white;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${typewriter} 2.5s steps(21, end) forwards, 
             blinkCursor 0.75s step-end 3s infinite;
  width: 0;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }
  
  @keyframes blinkCursor {
    from, to { border-color: transparent; }
    50% { border-color: white; }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    "Django Developer", 
    ".Net Developer",
    "Full-Stack Engineer", 
    "Backend Specialist"
  
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
        keywords=" Django Developer, .Net Developer,  Machine Learning, Python"
      />
      <HomeContainer id="main-content">
      <BackgroundElements aria-hidden="true" />
      <HeroContent>
        <header>
          <Greeting>Hello, I'm</Greeting>
          <Title>Shifa</Title>
          <TypewriterContainer>
            <Subtitle isTyping={isTyping} role="heading" aria-level={2}>
              {roles[currentRole]}
            </Subtitle>
          </TypewriterContainer>
        </header>
        <Description>
          Software Engineer and Full-Stack Developer specializing in .NET and Django. I architect scalable backend systems and robust web applications, bridging the gap between complex business logic and high-performance user experiences.
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
            
            <SocialLink href="https://github.com/ShifaChattha" target="_blank" rel="noopener noreferrer" title="GitHub">
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
</SocialLink>

<SocialLink href="https://www.linkedin.com/in/shifa-chattha-364172398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"  target="_blank" rel="noopener noreferrer" title="LinkedIn">
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
</SocialLink>
          </SocialLinks>
          
          <EmailContact>
           <EmailText>
  <svg 
    height="20" 
    width="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    style={{ marginRight: '10px', verticalAlign: 'middle' }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2-2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
  Get in touch:
</EmailText>
            <EmailAddress 
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("chatthashifa@gmail.com").then(() => {
                  alert("Email copied to clipboard: chatthashifa@gmail.com");
                }).catch(() => {
                  alert("Email: saadchattha77@gmail.com");
                });
              }}
            >
              chatthashifa@gmail.com
            </EmailAddress>
          </EmailContact>
        </aside>
      </HeroContent>
      <div id="projects-description" style={{position: 'absolute', left: '-9999px'}}>Navigate to projects page to view portfolio work</div>
    </HomeContainer>
    </>
  );
};

export default Home;