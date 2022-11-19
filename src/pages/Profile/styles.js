import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px 0;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    h2 {
      margin-top: 10px;
    }

    span {
      color: #666;
      margin-bottom: 10px;
      font-size: 0.9em;
    }

    p {
      border-top: 1px solid #666;
      padding-top: 0.5em;
    }

    .warnings {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      gap: 10px;

      .warn {
        display: flex;
        align-items: center;
        justify-content: center;

        .verified {
          color: #0f0;
          border: 1px solid #0f0;
          border-radius: 10px;
          padding: 5px;
        }

        .not-verified {
          color: #f00;
          border: 1px solid #f00;
          border-radius: 10px;
          padding: 5px;
        }

        button {
          margin-left: 10px;
          padding: 5px;
          border: 1px solid #666;
          border-radius: 10px;
          background: transparent;
          color: #666;
          cursor: pointer;

          &:hover {
            background: #666;
            color: #fff;
          }
        }
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
    width: 200px;
  }

  .logout {
    background-color: #f05a5b;

    &:hover {
      background-color: #e14f50;
    }
  }

  .edit-profile,
  .add-friend {
    background-color: #3b9eff;

    &:hover {
      background-color: #2f8ee7;
    }
  }
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 1em 0;
  border-top: 3px solid #eee;
  margin-top: 1em;

  h1 {
  }

  .no-data {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    img {
      width: 150px;
    }

    p {
      margin-top: 2em;
      font-size: 1.2em;
      color: #666;
    }
  }
`;

export const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1em 0;
  border-top: 3px solid #eee;
  margin-top: 1em;

  h1 {
    margin-bottom: 1em;
  }

  .no-data {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    img {
      width: 150px;
    }

    span {
      margin-top: 2em;
      font-size: 1.5em;
      color: #666;
    }
  }
  a {
    height: 180px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: transform 0.3s;

    &:hover {
      /* create a fly effect */
      transform: scale(1.1);

    }

    .friendCard {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      margin: 1em 0;
      padding: 1em 0;
      border: 1px solid #eee;
      border-radius: 10px;
      width: 200px;
      height: 100%;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;

        &:hover {
          cursor: pointer;

          opacity: 0.8;
        }
      }

      span {
        font-size: 1.2em;
        color: #666;
      }
    }
  }
`;
