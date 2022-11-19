import styled from "styled-components";

export const Nav = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    padding: 0 30px;
    background-color: #f05a5b;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    
    h1 {
        margin: 0;
        font-size: 1.2em;
    }

    a {
        color: #fff;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;

        .search {
            overflow: hidden;

            input {
                height: 30px;
                width: 200px;
                border: none;
                border-radius: 5px;
                padding: 0 10px;
                animation: 0.5s ease-in-out 0s 1 slideInFromRight;

                &:focus {
                    outline: none;
                }

                &::placeholder {
                    color: #999;
                }

                @keyframes slideInFromRight {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                @keyframes slideInFromLeft {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            }
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            color: #fff;
            font-size: 1.2em;
            padding: 0.5em;
            border-radius: 50%;
            position: relative;

            &:hover {
                background-color: #fff;
                color: #f05a5b;
            }
        }

        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            object-fit: cover;

            &:hover {
                opacity: 0.8;

                transition: opacity 0.2s;
            }
        }
    }


`;