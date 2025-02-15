import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Cambiar tema">
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.containerBg};
  }
`;

export default ThemeToggle; 