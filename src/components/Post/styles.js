import styled from "styled-components";

// create a post container styled component
export const PostContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  min-height: 20vh;
  border: 2px solid #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px;
  gap: 1em;
  background-color: #fff;
  font-family: "Roboto", sans-serif;

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

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }

  .user {
    display: flex;
    padding-bottom: 3px;
    border-bottom: 1px solid #f5f5f5;
    width: 100%;
    padding: 0.5em 1em;
    border-radius: 10px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #000;
      margin-right: 0.3em;

      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 0.5em;
      }
    }
  }

  .body {
    width: 100%;
    text-align: justify;
    padding: 1em;
  }

  .likesCount {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #000;
    padding: 0.5em 0;
    width: 92%;
    border-bottom: 2px solid #f5f5f5;
  }
  .interact {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #000;
    padding: 0.5em 1em;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
  }
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${(props) => (props.liked ? "blue" : "#000")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: ${(props) => (props.liked ? "2px solid blue" : "2px solid #f5f5f5")};
  background-color: #fff;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const UserInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0;

  span {
    font-size: 0.8em;
    color: #999;
    margin: 0;
    padding: 0;
  }
`;

export const UserName = styled.h3`
  &:after {
    content: '${props => props.date}';

    font-weight: 600;
    font-size: 0.8em;
    color: #999;
    margin-left: 0.5em;
  }
  
  font-size: 1em;
  margin: 0;
  padding: 0;

`;
