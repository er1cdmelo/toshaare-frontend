import styled from "styled-components";

// create a options button styled component
export const OptionsButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    position: absolute;
    top: 5px;
    right: 5px;

    &:hover {
        background-color: #f1f1f1;
    }
`

// create a options container styled component
export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100px;
    padding: .5em 0;
    top: 8%;
    right: 0;
    border-radius: 0 0 0 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transition: all 0.2s ease-in-out;

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

    button {
        width: 100%;
        padding: 0.5em 0;
        border: .1em solid #eee;
        background-color: transparent;
        border-radius: 0;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: #eee;
        }
    }
`