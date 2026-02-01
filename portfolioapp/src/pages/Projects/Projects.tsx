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
      title: "EtapsAI",
      type: "AI Chatbot",
      category: "AI/ML",
      description: "An intelligent e-commerce chatbot platform integrating OpenAI GPT-4o-mini with Django, featuring RAG systems, intent classification, and advanced NLP capabilities.",
      features: [
        "RAG System Implementation",
        "LangChain Integration",
        "OpenAI GPT-4o-mini API",
        "Intent Classification",
        "Real-time Chat Interface",
        "Dual Database Architecture"
      ],
      techStack: ["Django", "Python", "OpenAI API", "LangChain", "RAG", "MySQL", "MongoDB", "NLP"],
      githubUrl: "https://github.com/saadi-js/Ecommerce-DataBase-Assistant-Complete-djangoAPP",
      visualizationUrl: "/projects/etapsai",
      status: "Production"
    },
    {
      id: 2,
      title: "PALESSI",
      type: "E-Commerce",
      category: "Web Development",
      description: "A comprehensive Django-based e-commerce platform featuring AI-powered recommendations, user authentication, and intelligent product management system.",
      features: [
        "AI Product Recommendations",
        "User Authentication & Authorization", 
        "Shopping Cart & Checkout",
        "Order Management System",
        "Django Admin Panel",
        "Intelligent Search"
      ],
      techStack: ["Django", "Python", "SQLite", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Machine Learning"],
      githubUrl: "https://github.com/saadi-js/PALESSI",
      visualizationUrl: "/projects/palessi",
      status: "Production"
    },
    {
      id: 3,
      title: "Amazon Clone",
      type: "E-Commerce",
      category: "Web Development", 
      description: "A pixel-perfect Amazon clone built with vanilla JavaScript, featuring 68+ products, advanced search, cart management, and authentic Amazon UI/UX design.",
      features: [
        "68+ Products across 8 Categories",
        "Advanced Search & Filtering",
        "Local Storage Cart Management",
        "Multi-step Checkout Process",
        "Toast Notifications System",
        "Mobile-First Responsive Design"
      ],
      techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "Font Awesome", "XML Data", "Local Storage"],
      githubUrl: "https://github.com/saadi-js/Amazon-Clone",
      visualizationUrl: "/projects/amazon-clone",
      status: "Complete"
    },
    {
      id: 4,
      title: "Smart RAG Assistant",
      type: "AI Assistant",
      category: "AI/ML",
      description: "An advanced Retrieval Augmented Generation system built with LangChain and Django, providing intelligent document search and context-aware responses.",
      features: [
        "Document Vector Storage",
        "Semantic Search",
        "Context-Aware Responses",
        "LangChain Workflows",
        "Custom Embeddings",
        "Multi-format Document Support"
      ],
      techStack: ["LangChain", "Django", "Vector Databases", "OpenAI Embeddings", "Python", "RAG", "NLP"],
      githubUrl: "https://github.com/saadi-js/Ecommerce-DataBase-Assistant-Complete-djangoAPP",
      visualizationUrl: "/projects/smart-rag-assistant",
      status: "Active Development"
    },
    {
      id: 5,
      title: "TrackWise",
      type: "Mobile App",
      category: "Mobile Development",
      description: "A Flutter expense tracker with AI-powered spending insights, intelligent categorization, and machine learning-based budget recommendations.",
      features: [
        "AI Expense Categorization",
        "ML Budget Predictions",
        "Intelligent Insights",
        "Cross-Platform Support",
        "Splitwise Integration",
        "Smart Notifications"
      ],
      techStack: ["Flutter", "Dart", "Machine Learning", "SharedPreferences", "AI Analytics"],
      githubUrl: "https://github.com/saadi-js/Flutter_app",
      visualizationUrl: "/projects/trackwise",
      status: "In Development"
    }
  ];

  const categories = ['All', 'AI/ML', 'Web Development', 'Mobile Development'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter || project.type === activeFilter);

  return (
    <>
      <SEO 
        title="Projects"
        description="Showcasing AI/ML engineering and Django development projects featuring RAG systems, LangChain, and advanced machine learning applications."
        keywords="AI Projects, Machine Learning, Django Projects, RAG Systems, LangChain, Python Projects, AI Applications"
      />
      <ProjectsContainer>
      <Title>My Projects</Title>
      <Subtitle>
        Showcasing my expertise in AI/ML engineering and Django development through 
        intelligent applications featuring RAG systems, LangChain, and advanced machine learning.
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
                  <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}>
                    🐙 Code
                  </ProjectLink>
                )}
                {project.visualizationUrl && (
                  <ProjectLink as={Link} to={project.visualizationUrl} className="secondary" aria-label={`View ${project.title} project visualization`}>
                    👁️ Visualization
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