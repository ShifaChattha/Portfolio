import React from 'react';
// Add this to your Font Awesome imports at the top
import { FaCode } from 'react-icons/fa';
import { DiDatabase } from 'react-icons/di'; // Professional Database Cylinder
// OR
// import { SiMicrosoft } from 'react-icons/si'; // If you prefer the Microsoft Windows/Brand logo
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJsSquare, 
  FaHtml5, 
  FaCss3Alt, 
  FaBootstrap, 
  FaGitAlt, 
  FaGithub, 
  FaLinkedin,
   FaEye ,
  FaEnvelope
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiDjango, 
  SiFlutter, 
  SiMongodb, 
  SiMysql, 
  SiSqlite, 
  SiOpenai, 
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiVite,
  SiWebpack,
  SiRedux,
  SiStyledcomponents,
  SiMui,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiFirebase,
  SiVercel,
  SiOpencv,
  SiDotnet, 
  SiSharp,    
  SiRazorpay,
  SiNetlify
} from 'react-icons/si';
import { DiDart, DiAws } from 'react-icons/di';
const techIconMap1: Record<string, any> = {
  // ... other icons ...
  'Web API': FaCode,
  'REST API': FaCode, // Optional: add a variation in case you use this name later
};
interface TechIconProps {
  tech: string;
  size?: number;
  className?: string;
}


const techIconMap: Record<string, any> = {
  // Frontend
  'React': FaReact,
  'TypeScript': SiTypescript,
  'JavaScript': FaJsSquare,
  'HTML5': FaHtml5,
  'CSS3': FaCss3Alt,
  'Bootstrap': FaBootstrap,
  'Styled Components': SiStyledcomponents,
  'Material-UI': SiMui,
  'Tailwind CSS': SiTailwindcss,
  'Redux': SiRedux,
  'Vite': SiVite,
  'Webpack': SiWebpack,

  // Backend
  'Node.js': FaNodeJs,
  'Python': FaPython,
  'Django': SiDjango,

  // Mobile
  'Flutter': SiFlutter,
  'Dart': DiDart,

  // Databases
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'SQLite': SiSqlite,
  'PostgreSQL': SiPostgresql,
  'SQL Server': DiDatabase,

  // AI/ML
  'OpenAI API': SiOpenai,
  'TensorFlow': SiTensorflow,
  'Scikit-learn': SiScikitlearn,
  'Machine Learning': SiScikitlearn,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'LangChain': SiOpenai,
  'RAG': SiOpenai,
  'NLP': SiOpenai,

  // DevOps
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Git': FaGitAlt,
  'AWS': DiAws,
  'Google Cloud': SiGooglecloud,
  'Firebase': SiFirebase,

  // Deployment
  'Vercel': SiVercel,
  'Netlify': SiNetlify,

  // Other
  'Font Awesome': FaReact,
  'XML Data': FaJsSquare,
  'Local Storage': FaJsSquare,
  'SharedPreferences': DiDart,
  'AI Analytics': SiOpenai,
  'Vanilla JavaScript': FaJsSquare,
  'Vector Databases': SiMongodb,
  'OpenAI Embeddings': SiOpenai,
  'OpenCV': SiOpencv,
  'Computer Vision': SiOpencv,
  '.NET': SiDotnet,
  'C#': SiSharp,
  // 'SQL Server': SiMicrosoftexchange,
  'Entity Framework': SiDotnet,
  'Razorpay API': SiRazorpay,
  'Web API': FaCode
};

const socialIconMap = {
  'github': FaGithub,
  'linkedin': FaLinkedin,
  'email': FaEnvelope,
  'gmail': FaEnvelope
};

export const TechIcon: React.FC<TechIconProps> = ({ tech, size = 20, className }) => {
  const IconComponent = techIconMap[tech];
  
  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }
  
  // Fallback for techs without specific icons
  return <span className={className} style={{ fontSize: `${size}px` }}>⚡</span>;
};

export const SocialIcon: React.FC<{ platform: string; size?: number; className?: string }> = ({ 
  platform, 
  size = 24, 
  className 
}) => {
  let icon = platform;
  if (platform.toLowerCase() === 'github') icon = '🐙';
  if (platform.toLowerCase() === 'linkedin') icon = '💼';
  if (platform.toLowerCase() === 'email' || platform.toLowerCase() === 'gmail') icon = '✉️';
  
  return <span className={className} style={{ fontSize: `${size}px` }}>{icon}</span>;
};

export const getTechIcon = (tech: string) => {
  return techIconMap[tech] || null;
};

export default TechIcon;