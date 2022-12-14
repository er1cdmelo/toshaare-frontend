import styled from "styled-components";

export const Nav = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 30px;
  background-color: #1d2f6f;
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

    &.logo {
      &:hover {
        img {
          transform: scale(1.1) rotate(360deg);
        }

        h1 {
          width: 100px;
        }
      }
    }

    &.logo {
      h1 {
        font-family: "Teko", sans-serif;
        font-size: 1.8em;
        overflow: hidden;
        width: 0;

        white-space: nowrap;
        transition: all 1s ease-in-out;
      }

      img {
        max-width: 60px;
        transition: all 1s ease-in-out;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    .notifications-btn {
      &.new-notif {
        &::after {
          content: "";
          display: "block";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          top: 5px;
          right: 5px;
        }
      }

      &:hover {
        &::after {
          background-color: #f05a5b;
        }
      }
    }

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

  @media screen and (max-width: 768px) {
    justify-content: center;

    /* all a tags but .logo will be hidden */
    .user-info {
      display: none;
    }
  }
`;
