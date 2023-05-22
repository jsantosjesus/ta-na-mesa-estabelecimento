import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #914f16;
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;

  > a {
    text-decoration: none;
  }

  > svg {
    margin: 0 20px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
