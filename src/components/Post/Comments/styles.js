import styled from "styled-components";

export const CommentsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-top: 1px solid #eee;
    padding: 1em;
    gap: 1em;

    p {
        font-size: 1em;
        color: #7a7a7a;
        font-weight: 700;
    }
`;

export const Comment = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    /* make a slip down effect */
    animation: slipDown 0.5s ease-in-out;

    @keyframes slipDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #C5C5C5;
        object-fit: cover;
    }

    .comment {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 100%;
        max-width: 500px;
        border-radius: 10px;
        background-color: #f5f5f5;
        padding: 10px;

        .user {
            margin: 0;
            padding: 0;
            font-size: 1.1em;
            font-weight: 700;
        }

        .body {
            padding: 0;
        }
    }
`;

export const CommentForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin: 0 0 1.5em;

    input {
        width: 90%;
        max-width: 500px;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #eee;
        outline: none;
    }

    button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #eee;
        background-color: #1298ff;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1em;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: #0f7ed0;
        }
    }
`;