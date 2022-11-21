import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    min-height: 90vh;
    background-color: #f5f5f5;
    padding-top: 1em;

    .no-posts {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #999;
        font-weight: 600;
        margin-top: 2em;
        padding: 1em 0;

        img {
            width: 150px;
            
            margin-bottom: 1em;
        }

        h2 {
            margin-bottom: 1em;
            color: #333;
        }
    }

    .loading {
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;

        svg {
            font-size: 3em;
            
            /* create a heatbeat animation */
            animation: heartbeat 2s infinite;

            @keyframes heartbeat {
                0% {
                    transform: scale(1);
                }
                20% {
                    transform: scale(1.3);
                }
                40% {
                    transform: scale(1);
                }
                60% {
                    transform: scale(1.3);
                }
                80% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(1);
                }
            }
        }

        h2 {
            font-size: 1.5em;
            font-weight: 400;
            color: #666;
        }
    }
`;