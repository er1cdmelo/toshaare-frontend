import styled from "styled-components";

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    padding: 4em 1em 1em;
    width: 500px;
    max-width: 95%;
    min-height: 500px;
    gap: 10px;

    h1 {
        position: absolute;
        top: 10px;
    }

    .closeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
        border: 0;
        background-color: #f05a5b;
        cursor: pointer;
        transition: color 0.2s;
        color: #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            color: #666;
        }
    }

    input, textarea {
        width: 400px;
        max-width: 80%;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0 15px;
        font-size: 16px;
        color: #444;

        &::placeholder {
            color: #999;
        }

        &:focus {
            border-color: #3b9eff;
            outline: none;
        }

        &[type="file"] {
            display: none;
        }
    }

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #ddd;
        object-fit: cover;

        &:hover {
            opacity: 0.7;
        }
    }

    .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        background-color: #f05a5b;
        color: #fff;
        border: 0;
        border-radius: 4px;
        width: 180px;
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e14f50;

            svg {
                color: #fff;
            }
        }
    }

    .btn {
        margin-top: 10px;
        color: #fff;
        border: 0;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 150px;
        background-color: #3b9eff;

        &:hover {
            background-color: #2f8ee7;
        }
    }
`;

