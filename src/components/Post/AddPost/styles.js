import styled from "styled-components";

// create a styled component for a post form
export const PostForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 1em;
  gap: 1em;

  .user-info {
    display: flex;
    width: 100%;
    gap: 1em;

    img {
      width: 40px;
      height: 40px;
      margin: 0;
      border-radius: 50%;
      border: 1px solid #C5C5C5;
      object-fit: cover;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  input {
    width: 100%;
    height: 100px;
    padding: 0 1em;
    padding-bottom: 50px;
    vertical-align: top;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 100%;
    max-width: 200px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #1d2f6f;
    color: #fff;
    font-size: 1.2em;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition: all 0.3s ease-in-out;

    &:hover {
      /* make the button lighter when hovered */
      background-color: #2d3f7f;
    }
  }
`;
