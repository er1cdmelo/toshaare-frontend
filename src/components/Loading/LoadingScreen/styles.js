import styled from "styled-components";

export const LoadingScreenContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #1d2f6f;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    img {
        width: 100px;
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
`