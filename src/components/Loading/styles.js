import styled from "styled-components";

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const Loader = styled.div`
    width: 1vw;
    height: 1vw;
    border-radius: 50%;
    border: 2px solid #f5f5f5;
    border-top: 2px solid #000;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;