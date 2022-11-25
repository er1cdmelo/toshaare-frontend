import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 3em;
  min-height: 76vh;
  width: 100%;

  input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    margin-bottom: 1em;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-size: 0.9em;
    }
  }

  div {
    width: 100%;
    margin-top: 3em;
    background-color: transparent;
    box-shadow: none;

    ul {
      width: 100%;

      a {
        text-decoration: none;

        li {
          display: flex;
          align-items: center;
          padding: 0.5em;
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

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
      }
    }
  }
`;
