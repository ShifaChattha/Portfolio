import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from '../../components/SEO';
import Toast from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  fadeInAnimation,
  staggeredFadeIn,
  hoverLift,
  pulseAnimation 
} from '../../styles/animations';

const ContactContainer = styled.div`
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
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.dark};
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
  margin-bottom: ${props => props.theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  ${staggeredFadeIn(0.3)};
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.heavy};
  ${hoverLift};
  opacity: 0;
  ${staggeredFadeIn(0.6)};
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.hasError ? '#dc3545' : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(74, 111, 165, 0.1)'};
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.hasError ? '#dc3545' : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(74, 111, 165, 0.1)'};
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
`;

const SubmitButton = styled.button<{ $isSubmitting: boolean }>`
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(74, 111, 165, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  ${props => props.$isSubmitting && pulseAnimation}
`;

const ContactInfo = styled.div`
  opacity: 0;
  ${staggeredFadeIn(0.9)};
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.lg};
  ${hoverLift};
`;

const InfoTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.gradients.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(74, 111, 165, 0.3);
  }
`;

const QuickContact = styled.div`
  background: ${props => props.theme.colors.gradients.secondary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
`;

const QuickContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const QuickContactText = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  opacity: 0.9;
`;

const QuickContactEmail = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  padding: ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const QuickContactButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({ message: 'Please fix the errors below', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});

    // Simulate form submission
    setTimeout(() => {
      setToast({ message: 'Thank you for your message! I\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }, 2000);
  };

  return (
    <>
      <SEO 
        title="Contact"
        description="Get in touch to discuss AI projects, Django development, or collaboration opportunities. Let's bring your ideas to life."
        keywords="Contact, AI Engineer, Django Developer, Collaboration, Hire Developer, AI Consulting"
      />
      <ContactContainer>
      <Title>Let's Work Together</Title>
      <Subtitle>
        Have a project in mind? I'd love to hear about it. 
        Let's discuss how we can bring your ideas to life.
      </Subtitle>
      
      <ContactContent>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send Me a Message</FormTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                hasError={!!formErrors.name}
                required
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <ErrorMessage id="name-error" role="alert">
                  {formErrors.name}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="chatthashifa@gmail.com"
                hasError={!!formErrors.email}
                required
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <ErrorMessage id="email-error" role="alert">
                  {formErrors.email}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                hasError={!!formErrors.subject}
                required
                aria-invalid={!!formErrors.subject}
                aria-describedby={formErrors.subject ? "subject-error" : undefined}
              />
              {formErrors.subject && (
                <ErrorMessage id="subject-error" role="alert">
                  {formErrors.subject}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                hasError={!!formErrors.message}
                required
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
              />
              {formErrors.message && (
                <ErrorMessage id="message-error" role="alert">
                  {formErrors.message}
                </ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          {/* <SubmitButton type="submit" disabled={isSubmitting} $isSubmitting={isSubmitting}>
            {isSubmitting ? '🚀 Sending...' : '📧 Send Message'}
          </SubmitButton> */}
          <SubmitButton type="submit" disabled={isSubmitting} $isSubmitting={isSubmitting}>
  {isSubmitting ? (
    <>
      {/* Professional Spinner */}
      <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', animation: 'spin 1s linear infinite' }}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Sending...
    </>
  ) : (
    <>
      {/* Professional Mail Icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      Send Message
    </>
  )}
</SubmitButton>
        </ContactForm>

        <ContactInfo>
          <InfoCard>
            <InfoTitle>Professional Contact</InfoTitle>
            
            <InfoText>
              I'm always open to discussing new opportunities, 
              collaborations, and interesting projects. 
            </InfoText>
            <SocialLinks>
             
              <SocialLinks aria-label="Social media links">
  {/* GitHub Link */}
  <SocialLink 
    href="https://github.com/ShifaChattha" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="GitHub"
  >
    <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    GitHub
  </SocialLink>

  {/* LinkedIn Link */}
  <SocialLink 
    href="https://www.linkedin.com/in/shifa-chattha-364172398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
    target="_blank" 
    rel="noopener noreferrer" 
    title="LinkedIn"
  >
    <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
    LinkedIn
  </SocialLink>

  {/* Email Link */}
  <SocialLink 
    href="mailto:chatthashifa@gmail.com" 
    title="Email"
  >
    <svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
    Email
  </SocialLink>
</SocialLinks>
            </SocialLinks>
          </InfoCard>

          <QuickContact>
            <QuickContactTitle> Quick Chat?</QuickContactTitle>
            <QuickContactText>
              Prefer a quick conversation? Feel free to schedule a call or 
              reach out directly.
            </QuickContactText>
            {/* <QuickContactEmail>
              📧 chatthashifa@gmail.com
            </QuickContactEmail> */}
            <QuickContactEmail>
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ marginRight: '10px', verticalAlign: 'middle' }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
  chatthashifa@gmail.com
</QuickContactEmail>
          </QuickContact>
        </ContactInfo>
      </ContactContent>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {isSubmitting && <LoadingSpinner fullScreen text="Sending your message..." />}
    </ContactContainer>
    </>
  );
};

export default Contact;