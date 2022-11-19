import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    width: 95%;
    padding: 1em 0;
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 400px;
        margin-top: 30px;

        h1 {
            margin-bottom: 20px;
        }

        label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;

        }

        input {
            width: 100%;
            height: 50px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 0 15px;
            font-size: 16px;
            color: #444;
            margin-bottom: 10px;

            &::placeholder {
                color: #999;
            }

            &:focus {
                border: 1px solid #7159c1;
                outline: none;
            }
        }

        button {
            width: 100%;
            height: 50px;
            border: 0;
            border-radius: 4px;
            background: #f05a5b;
            font-weight: bold;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background: #e14f50;
            }

        }

        a {
            color: #f05a5b;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;
        
            &:hover {
                opacity: 1;
            }

        }

        p {
            color: #f05a5b;
            font-size: 16px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        p.avaible {
            color: #2ca42b;
        }

        p.unavaible {
            color: #de3b3b;
        }
    }

`