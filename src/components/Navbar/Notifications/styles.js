import styled from "styled-components";

export const NotificationsContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  height: 300px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow-y: auto;
  padding: .5em;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  animation: appear 0.2s ease-in-out forwards;

  @keyframes appear {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  ul {
    color: #000;
    width: 100%;
    border: 1px solid #000;

    .notification {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: .5em;
      border-bottom: 1px solid #ccc;
      transition: all 0.2s ease-in-out;
      background-color: #f5f5f5;
      color: #000;
      gap: .5em;
      cursor: pointer;

      &:hover {
        background-color: #f05a5b;
        color: #fff;

        p {
          color: #fff;
        }
      }

      p {
        color: #f05a5b;
      }

      .notification-info {
        display: flex;
        align-items: center;
        gap: 1em;
        color: #000;

        img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }

  p {
    color: #000;
  }
`;
