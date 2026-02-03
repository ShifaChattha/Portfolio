import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import { TechIcon } from '../../components/TechIcon/TechIcon';
import { 
  fadeInAnimation, 
  staggeredFadeIn,
  hoverLift
} from '../../styles/animations';

const ProjectsContainer = styled.div`
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  margin-top: 80px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
  background: ${props => props.theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  ${fadeInAnimation};
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  ${staggeredFadeIn(0.3)};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  opacity: 0;
  ${staggeredFadeIn(0.6)};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.$active ? 'white' : props.theme.colors.textLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const ProjectCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  position: relative;
  ${hoverLift};
  opacity: 0;
  ${staggeredFadeIn(0.9)};
`;

const ProjectImageContainer = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
`;

const ProjectImage = styled.div<{ bgImage?: string }>`
  height: 100%;
  background: ${props => 
    props.bgImage 
      ? `url(${props.bgImage}) center/cover` 
      : props.theme.colors.gradients.primary
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-weight: 700;
`;

const ProjectType = styled.span`
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.primary};
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1rem;
`;

const FeaturesList = styled.ul`
  margin: ${props => props.theme.spacing.sm} 0;
  padding-left: 0;
`;

const FeatureItem = styled.li`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 4px;
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.success};
    font-weight: bold;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.theme.colors.gradients.secondary};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectLink = styled.a`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${props => props.theme.colors.dark};
    transform: translateY(-2px);
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  }

  &.secondary:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

interface Project {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  visualizationUrl?: string;
  githubUrl?: string;
  image?: string;
  status: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects: Project[] = [
   {
  id: 1,
  title: "NARS AI Beauty Assistant",
  type: "AI E-commerce Solution",
  category: "AI/ML",
  description: "A specialized AI chatbot for NARS Cosmetics that assists users with product discovery and makeup queries. Built with Django and OpenAI, it utilizes NLP to understand user intent and retrieve real-time data from a SQL database.",
  features: [
    "AI-Powered Product Recommendations",
    "Natural Language Processing (NLP) for Beauty Queries",
    "Real-time SQL Database Synchronization",
    "OpenAI GPT-4o API Integration",
    "Intent Classification for Customer Support",
    "Responsive Chat Interface with Django Backend"
  ],
  techStack: ["Django", "Python", "OpenAI API", "MySQL", "NLP", "JavaScript"],
  githubUrl: "https://github.com/ShifaChattha/ChatBotAssistant", // Updated to your username
  visualizationUrl: "/projects/nars-ai",
  status: "Complete"
},
    {
  id: 2,
  title: "Furniture ERP",
  type: "E-Commerce Website",
  category: "Full Stack Development",
  description: "A robust .NET e-commerce ecosystem for furniture retail, developed using a Database-First approach. Features a sophisticated Role-Based Access Control (RBAC) system for administrators, content writers, and stock managers.",
  features: [
    "Database-First Architecture with Entity Framework",
    "Role-Based Access Control (Admin, Writer, Stock Manager)",
    "Inventory & Stock Management Module",
    "Product Lifecycle Management for Content Writers",
    "Secure Checkout & Order Processing",
    "SQL Server Integration for Complex Data Relations"
  ],
  techStack: [".NET", "C#", "SQL Server", "Entity Framework", "Web API", "JavaScript", "Bootstrap"],
  githubUrl: "https://github.com/ShifaChattha/Furniture_ecommerce_website",
  visualizationUrl: "/projects/furniture-erp",
  status: "Production"
},
    {
  id: 3,
  title: "Pinterest Clone",
  type: "Social Discovery Platform",
  category: "Web Development", 
  description: "A visually-driven Pinterest replica built with vanilla JavaScript. It features a dynamic masonry-style grid layout, image saving capabilities, and a fully responsive UI/UX designed for content discovery.",
  features: [
   "Custom User Authentication (Sign-up/Login logic)",
    "Session Persistence via LocalStorage",
    "Dynamic Image Grid & Masonry Layout",
    "Persistent 'Pin' Saving and Board Management",
    "Client-side Search & Content Filtering",
    "State Management using Browser Storage"
  ],
  techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Font Awesome", "XML Data", "Local Storage"],
  githubUrl: "https://github.com/ShifaChattha/pinterest-frontend-clone", // Updated to your username
  visualizationUrl: "/projects/pinterest-clone",
  status: "Complete"
},
  
   {
  id: 4,
  title: "CineFace Recognition",
  type: "Computer Vision",
  category: "AI/ML",
  description: "A Python-based facial recognition system using OpenCV to identify famous actors in real-time. The system process images to detect, align, and match faces against a trained dataset.",
  features: [
    "Real-time Face Detection & Tracking",
    "Dataset Augmentation for Accuracy",
    "Confidence Score Calculation",
    "Optimized Image Pre-processing",
    "LBPH/Eigenfaces Training Model",
    "Haar Cascade Classifiers"
  ],
  techStack: ["Python", "OpenCV", "NumPy"],
  githubUrl: "https://github.com/ShifaChattha/celebrity-face-recognition-cv", // Update with your actual repo name
  visualizationUrl: "/projects/cineface-recognition",
  status: "Complete"
}
  ];

  const categories = ['All', 'AI/ML', 'Web Development', 'Full Stack Development'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter || project.type === activeFilter);

  return (
    <>
      <SEO 
        title="Projects"
        description="Showcasing expertise in Django and .NET development, specializing in building scalable backend architectures, robust APIs, and high-performance enterprise applications."
        keywords=".Net Projects, Machine Learning, Django Projects, Python Projects, AI Applications"
      />
      <ProjectsContainer>
      <Title>My Projects</Title>
      <Subtitle>
      Showcasing expertise in Django and .NET development, specializing in building scalable backend architectures, robust APIs, and high-performance enterprise applications.
      </Subtitle>
      
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectGrid>
        {filteredProjects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectImageContainer>
              <ProjectImage bgImage={project.image}>
                {!project.image && `${project.title} Preview`}
              </ProjectImage>
            </ProjectImageContainer>
            <ProjectContent>
              <ProjectHeader>
                <div>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectType>{project.type}</ProjectType>
                </div>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <FeaturesList>
                {project.features.slice(0, 4).map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
                {project.features.length > 4 && (
                  <FeatureItem>And {project.features.length - 4} more features...</FeatureItem>
                )}
              </FeaturesList>
              
              <TechStack>
                {project.techStack.map((tech, index) => (
                  <TechTag key={index}>
                    <TechIcon tech={tech} size={16} />
                    <span>{tech}</span>
                  </TechTag>
                ))}
              </TechStack>
              
              <ProjectLinks>
              
                {project.githubUrl && (
  <ProjectLink 
    href={project.githubUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={`View ${project.title} source code on GitHub`}
  >
    <svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    Code
  </ProjectLink>
)}

{project.visualizationUrl && (
  <ProjectLink 
    as={Link} 
    to={project.visualizationUrl} 
    className="secondary" 
    aria-label={`View ${project.title} project visualization`}
  >
    <svg height="18" width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
    Visualization
  </ProjectLink>
)}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
    </>
  );
};

export default Projects;