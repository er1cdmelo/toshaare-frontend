import styled from "styled-components";

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    max-height: 100%;

    svg {
        width: 100px;
        max-width: 80%;
        animation: spin 1s linear infinite;

        @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    }
`;