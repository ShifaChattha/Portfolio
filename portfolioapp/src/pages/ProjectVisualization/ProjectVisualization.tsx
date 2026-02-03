import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { fadeInAnimation, slideInFromBottomAnimation, hoverLift } from '../../styles/animations';
import OptimizedImage from '../../components/OptimizedImage';
import { TechIcon } from '../../components/TechIcon/TechIcon';

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const slideInFromBottomRight = keyframes`
  from {
    opacity: 0;
    transform: translate(50px, 50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

const slideInFromBottomLeft = keyframes`
  from {
    opacity: 0;
    transform: translate(-50px, 50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

const slideInAlternate = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
`;

const modalFadeOut = keyframes`
  from {
    opacity: 1;
    backdrop-filter: blur(10px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
`;

const modalScaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const modalScaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
`;

const VisualizationContainer = styled.div`
  min-height: 100vh;
  padding: 100px ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background: ${props => props.theme.colors.dark};
    transform: translateY(-2px);
  }
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  opacity: 0;
  ${fadeInAnimation};
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
`;

const ProjectDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const GalleryTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  
  &::before {
    // content: '📸';
    font-size: 1.2em;
  }
  
  &::after {
    content: 'Hover to preview';
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textLight};
    margin-left: ${props => props.theme.spacing.sm};
    padding: 4px 8px;
    background: rgba(74, 111, 165, 0.1);
    border-radius: ${props => props.theme.borderRadius.sm};
    font-weight: 400;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.xxl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  min-height: 800px;
  position: relative;
  overflow: visible;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CascadingContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
  overflow: visible;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.lg};
  }
`;

const ImageWrapper = styled.div<{ 
  index: number; 
  isHovered: boolean;
  animationType: 'left' | 'bottomRight' | 'bottomLeft' | 'alternate';
}>`
  position: relative;
  width: 100%;
  aspect-ratio: ${props => props.index === 0 ? '3/2' : '4/3'};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-fill-mode: forwards;
  opacity: 0;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}20 0%, 
    ${props => props.theme.colors.secondary}20 100%
  );
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${props => props.theme.shadows.light};
  z-index: ${props => props.isHovered ? 1000 : 10 - props.index};
  cursor: pointer;
  
  ${props => {
    const delay = props.index * 0.3;
    switch (props.animationType) {
      case 'left':
        return css`animation: ${slideInFromLeft} 0.8s ease-out ${delay}s forwards;`;
      case 'bottomRight':
        return css`animation: ${slideInFromBottomRight} 0.8s ease-out ${delay}s forwards;`;
      case 'bottomLeft':
        return css`animation: ${slideInFromBottomLeft} 0.8s ease-out ${delay}s forwards;`;
      case 'alternate':
        return css`animation: ${slideInAlternate} 0.8s ease-out ${delay}s forwards;`;
      default:
        return css`animation: ${slideInFromLeft} 0.8s ease-out ${delay}s forwards;`;
    }
  }}
  
  ${props => props.isHovered && `
    transform: scale(4.0) translateY(-50px);
    box-shadow: 0 80px 160px rgba(74, 111, 165, 0.8), 
                0 40px 80px rgba(0, 0, 0, 0.6),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
    border-color: ${props.theme.colors.primary};
    border-width: 3px;
    background: linear-gradient(135deg, 
      ${props.theme.colors.primary}30 0%, 
      ${props.theme.colors.secondary}30 100%
    );
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(74, 111, 165, 0.1) 0%, 
      rgba(122, 139, 153, 0.1) 50%,
      rgba(143, 164, 179, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
    pointer-events: none;
  }
  
  ${props => props.isHovered && `
    &::before {
      opacity: 1;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    aspect-ratio: 4/3;
    
    ${props => props.isHovered && `
      transform: scale(3.5) translateY(-30px);
    `}
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  opacity: 0;
  ${slideInFromBottomAnimation};
  animation-delay: 1s;
`;

const ActionButton = styled.a`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
  justify-content: center;
  ${hoverLift};

  &:hover {
    background: ${props => props.theme.colors.dark};
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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

const TechStack = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TechBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.primary};
  padding: 10px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colors.light};
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean; isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: ${props => props.isClosing ? modalFadeOut : modalFadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{ isClosing?: boolean }>`
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.isClosing ? modalScaleOut : modalScaleIn} 0.3s ease-out;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  color: white; /* Icon will stay white but on a dark circle */
  border: 2px solid rgba(255, 255, 255, 0.8); /* Light border for visibility */
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px); /* Background blur effect */
  transition: all 0.3s ease;
  z-index: 10001; /* Image se upar rakhne ke liye */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Button ko image se 'upr' uthane ke liye shadow */
  
  &:hover {
    background: ${props => props.theme.colors.primary}; /* Hover pe blue/primary color */
    transform: scale(1.1) rotate(90deg); /* Thora sa rotate effect */
    border-color: white;
  }
`;


interface ProjectData {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const projectData: Record<string, ProjectData> = {
  
  'nars-ai': {
    id: 1,
    title: 'NARS AI Beauty Assistant',
    description: 'A specialized AI chatbot for NARS Cosmetics that assists users with product discovery and makeup queries using NLP to understand user intent and retrieve real-time data.',
    techStack: ['Django', 'Python', 'OpenAI API', 'MySQL', 'NLP', 'JavaScript'],
    // images: ['portfolio\portfolioapp\public\assets\FaceReco\Screenshot (147).png', 'C:\Users\hp\Desktop\clone portfoio\portfolio\portfolioapp\public\assets\FaceReco\Screenshot (148).png', 'C:\Users\hp\Desktop\clone portfoio\portfolio\portfolioapp\public\assets\FaceReco\Screenshot (150).png', '/assets/Palessi/Palessi-5.png', '/assets/Palessi/Palessi-6.png', '/assets/Palessi/Palessi-7.png', '/assets/Palessi/Palessi-8.png', '/assets/Palessi/Palessi-9.png', '/assets/Palessi/Palessi-10.png', '/assets/Palessi/Palessi-11.png'],
    images: ['/assets/NarsChat/n1.jpg', '/assets/NarsChat/n2.jpg','/assets/NarsChat/n3.jpg','/assets/NarsChat/n4.jpg'],
    githubUrl: 'https://github.com/ShifaChattha/ChatBotAssistant',
    demoUrl: '#'
  },
  'furniture-erp': {
    id: 2,
    title: 'Furniture ERP',
    description: 'A robust .NET e-commerce ecosystem for furniture retail featuring a Database-First approach and a sophisticated Role-Based Access Control (RBAC) system.',
    techStack: ['.NET', 'C#', 'SQL Server', 'Entity Framework', 'Web API', 'JavaScript', 'Bootstrap'],
    images: ['/assets/Furni/Screenshot (124).png','/assets/Furni/Screenshot (116).png ','/assets/Furni/Screenshot (117).png','/assets/Furni/Screenshot (125).png','/assets/Furni/Screenshot (128).png','/assets/Furni/Screenshot (129).png','/assets/Furni/Screenshot (119).png','/assets/Furni/Screenshot (120).png','/assets/Furni/Screenshot (121).png'],
    githubUrl: 'https://github.com/ShifaChattha/Furniture_ecommerce_website',
    demoUrl: '#'
  },
  'pinterest-clone': {
    id: 3,
    title: 'Pinterest Clone',
    description: 'A visually-driven social discovery platform built with vanilla JavaScript, featuring a dynamic masonry-style grid layout and session persistence via LocalStorage.',
    techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Font Awesome', 'XML Data', 'Local Storage'],
    images: ['/assets/pint/p1.jpg','/assets/pint/p2.jpg','/assets/pint/p3.jpg', '/assets/pint/p4.jpg','/assets/pint/p5.jpg','/assets/pint/p6.jpg','/assets/pint/p7.jpg','/assets/pint/p8.jpg','/assets/pint/p9.jpg','/assets/pint/p10.jpg' ,'/assets/pint/p11.jpg','/assets/pint/p12.jpg','/assets/pint/p13.jpg', '/assets/pint/p14.jpg','/assets/pint/p15.jpg','/assets/pint/p16.jpg','/assets/pint/p17.jpg','/assets/pint/p18.jpg','/assets/pint/p19.jpg','/assets/pint/p20.jpg','/assets/pint/p7.jpg'],
    githubUrl: 'https://github.com/ShifaChattha/pinterest-frontend-clone',
    demoUrl: '#'
  },
  'cineface-recognition': {
    id: 4,
    title: 'CineFace Recognition',
    description: 'A Python-based facial recognition system using OpenCV to identify famous actors in real-time by detecting, aligning, and matching faces against trained datasets.',
    techStack: ['Python', 'OpenCV', 'NumPy', 'AI/ML', 'Computer Vision'],
    images: ['/assets/FaceReco/Screenshot (147).png', '/assets/FaceReco/Screenshot (148).png', '/assets/FaceReco/Screenshot (150).png', '/assets/FaceReco/Screenshot (145).png', '/assets/FaceReco/Screenshot (146).png', '/assets/FaceReco/Screenshot (143).png'],
    githubUrl: 'https://github.com/ShifaChattha/celebrity-face-recognition-cv',
    demoUrl: '#'
  }

};

const ProjectVisualization: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const project = projectId ? projectData[projectId] : null;

  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [modalImage]);

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setModalImage(null);
      setIsModalClosing(false);
    }, 300);
  };

  const getAnimationType = (index: number): 'left' | 'bottomRight' | 'bottomLeft' | 'alternate' => {
    if (index === 0) return 'left';
    if (index === 1) return 'bottomRight';
    if (index === 2) return 'bottomLeft';
    return 'alternate';
  };

  if (!project) {
    return null;
  }

  return (
    <VisualizationContainer>
      <BackButton onClick={() => navigate('/projects')}>
        ← Back to Projects
      </BackButton>

      <ProjectHeader>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectHeader>

      <TechStack>
        {project.techStack.map((tech, index) => (
          <TechBadge key={index}>
            <TechIcon tech={tech} size={18} />
            <span>{tech}</span>
          </TechBadge>
        ))}
      </TechStack>

      <ImageGallery>
        <GalleryTitle>Project Gallery</GalleryTitle>
        
        <CascadingContainer>
          {project.images.map((image, index) => (
            <ImageWrapper
              key={index}
              index={index}
              isHovered={hoveredImage === index}
              animationType={getAnimationType(index)}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setModalImage({ src: image, alt: `${project.title} Screenshot ${index + 1}` })}
            >
              <OptimizedImage
                src={image} 
                alt={`${project.title} Screenshot ${index + 1}`}
                width="100%"
                height="100%"
                lazy={index > 2}
                placeholder={index === 0 ? undefined : image}
                style={{
                  borderRadius: 'inherit',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                  filter: hoveredImage === index ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)'
                }}
                onLoad={() => {
                  console.log(`Image ${index + 1} loaded successfully`);
                }}
                onError={() => {
                  console.warn(`Failed to load image: ${image}`);
                }}
              />
            </ImageWrapper>
          ))}
        </CascadingContainer>
      </ImageGallery>

      <ActionButtons>
        <ActionButton href={project.githubUrl} target="_blank" rel="noopener noreferrer">
           GitHub Repository
        </ActionButton>
        {/* <ActionButton href={project.demoUrl} className="secondary">
          Live Demo
        </ActionButton> */}
      </ActionButtons>
      
      <ModalOverlay 
        isOpen={modalImage !== null}
        isClosing={isModalClosing}
        onClick={closeModal}
      >
        <ModalContent isClosing={isModalClosing} onClick={(e) => e.stopPropagation()}>
          {modalImage && (
            <>
              <ModalImage 
                src={modalImage.src} 
                alt={modalImage.alt}
              />
              <CloseButton onClick={closeModal}>
                ✕
              </CloseButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </VisualizationContainer>
  );
};

export default ProjectVisualization;