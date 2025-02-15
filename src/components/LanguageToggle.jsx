import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <ToggleButton 
      onClick={toggleLanguage} 
      aria-label="Cambiar idioma"
    >
      {i18n.language === 'es' ? 'EN' : 'ES'}
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: ${props => props.theme.containerBg};
  }
`;

export default LanguageToggle; 