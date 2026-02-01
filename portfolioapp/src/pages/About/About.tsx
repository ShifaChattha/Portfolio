import React from 'react';
import styled from 'styled-components';
import { 
  fadeInAnimation,
  staggeredFadeIn,
  hoverLift,
  hoverGlow
} from '../../styles/animations';

const AboutContainer = styled.div`
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  margin-top: 80px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.dark};
  opacity: 0;
  ${fadeInAnimation};
  background: ${props => props.theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ImageSection = styled.div`
  text-align: center;
  opacity: 0;
  ${staggeredFadeIn(0.3)};
`;

const ProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-image: url('/assets/pfp.jpeg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto ${props => props.theme.spacing.lg};
  border: 5px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.heavy};
  position: relative;
  overflow: hidden;
  ${hoverGlow};
  
  /* Ensure perfect circle aspect ratio */
  aspect-ratio: 1 / 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.gradients.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
  
  /* Fallback if image doesn't load */
  &::after {
    content: '👨‍💻';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  /* Show fallback if background image fails to load */
  @supports not (background-image: url('/assets/pfp.jpeg')) {
    &::after {
      opacity: 1;
    }
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const TextSection = styled.div`
  opacity: 0;
  ${staggeredFadeIn(0.6)};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${props => props.theme.colors.gradients.primary};
    border-radius: 2px;
  }
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SkillCategory = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  ${hoverLift};
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`;

const SkillTag = styled.span`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(74, 111, 165, 0.3);
  }
`;

const HighlightBox = styled.div`
  background: ${props => props.theme.colors.gradients.secondary};
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.lg} 0;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const HighlightText = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
`;

const ContactCTA = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  opacity: 0;
  ${staggeredFadeIn(1.2)};
`;

const ContactButton = styled.button`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 111, 165, 0.4);
  }
`;

const About: React.FC = () => {
  const aiSkills = [
    'AI & Machine Learning', 'RAG Systems', 'LangChain', 
    'OpenAI API', 'Natural Language Processing', 'Prompt Engineering'
  ];
  
  const backendSkills = [
    'Django & Python', 'AI Chatbots', 'Vector Databases', 
    'Django REST Framework', 'MySQL & SQLite', 'MongoDB'
  ];
  
  const toolsSkills = [
    'Git & GitHub', 'Flutter & Dart', 'HTML5 & CSS3', 
    'JavaScript', 'SharedPreferences', 'Cross-platform Development'
  ];

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <AboutContainer>
      <Title>About Me</Title>
      <Content>
        <ImageSection>
          <ProfileImage />
          <QuickStats>
            <StatCard>
              <StatNumber>4+</StatNumber>
              <StatLabel>AI Projects</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>3+</StatNumber>
              <StatLabel>Years</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>AI/ML</StatNumber>
              <StatLabel>Specialist</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>100%</StatNumber>
              <StatLabel>Innovation</StatLabel>
            </StatCard>
          </QuickStats>
        </ImageSection>
        
        <TextSection>
          <Section>
            <SectionTitle>Who I Am</SectionTitle>
            <Paragraph>
              I'm Saadi, an AI Engineer and Django developer specializing in building intelligent 
              applications that leverage cutting-edge AI technologies. My expertise spans from 
              developing RAG systems and LangChain implementations to creating sophisticated 
              AI-powered chatbots and machine learning solutions.
            </Paragraph>
            <Paragraph>
              I combine deep AI knowledge with robust backend development skills, creating everything 
              from intelligent e-commerce chatbots to comprehensive Django applications with 
              AI integrations that solve complex real-world problems.
            </Paragraph>
          </Section>

          <HighlightBox>
            <HighlightText>
              "I believe in harnessing the power of AI to create intelligent, adaptive solutions. 
              Whether it's implementing RAG systems, building LangChain workflows, or developing 
              AI-driven applications, I focus on creating meaningful AI experiences."
            </HighlightText>
          </HighlightBox>

          <Section>
            <SectionTitle>What I Do</SectionTitle>
            <Paragraph>
              As an AI Engineer, I specialize in developing intelligent systems using modern AI frameworks 
              like LangChain for building complex AI workflows, implementing RAG (Retrieval Augmented Generation) 
              systems for enhanced AI responses, and creating sophisticated chatbots with OpenAI integration.
            </Paragraph>
            <Paragraph>
              On the development side, I build robust Django applications that seamlessly integrate 
              AI capabilities, from intelligent chatbots and recommendation systems to advanced 
              natural language processing solutions that enhance user experiences.
            </Paragraph>
          </Section>
        </TextSection>
      </Content>

      <SkillsContainer>
        <SkillCategory>
          <CategoryTitle>AI & Machine Learning</CategoryTitle>
          <SkillsList>
            {aiSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Backend & AI Development</CategoryTitle>
          <SkillsList>
            {backendSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Development Tools</CategoryTitle>
          <SkillsList>
            {toolsSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillsList>
        </SkillCategory>
      </SkillsContainer>

      <ContactCTA>
        <ContactButton onClick={handleContactClick}>
          Let's Build AI Solutions Together
        </ContactButton>
      </ContactCTA>
    </AboutContainer>
  );
};

export default About;