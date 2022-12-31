import styled from 'styled-components';

const MainButtonStyle = styled.button`
  max-width: 110px;
  padding: 4px;

  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: 0 1px 2px #dddddd;
  border-radius: 6px;

  cursor: pointer;

  &:active{
    background-color: #3488f7;
  }
`;

export default MainButtonStyle;