import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/themes';
import QRGenerator from './components/QRGenerator';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['es', 'en'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    i18n.changeLanguage(defaultLang);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <LanguageToggle />
        </Header>
        <MainContent>
          <Title>{t('title')}</Title>
          <Description>{t('description')}</Description>
          <QRGenerator />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 60px 20px 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};

  @media (max-width: 600px) {
    padding-top: 60px;
  }
`;

const Header = styled.header`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;

  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.containerBg};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

export default App; 