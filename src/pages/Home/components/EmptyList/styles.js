import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
