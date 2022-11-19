import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    position: absolute;
    width: 200px;
    padding: .5em 0;
    height: 300px;
    z-index: 10;
    /* make a border radius only on the bottom left and bottom right */
    border-radius: 0 0 5px 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    background-color: #fff;

    ul {
        width: 100%;


        
        li {
            display: flex;
            align-items: center;
            padding: .5em;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            gap: 1em;
            color: #000;
            width: 100%;
            border-bottom: 1px solid #ccc;

            &:hover {
                background-color: #f05a5b;

                color: #fff;
            }
        }
    }

`