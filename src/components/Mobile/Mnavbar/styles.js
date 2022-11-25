import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: #1d2f6f;
  height: 60px;
  display: none;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  bottom: 10px;
  z-index: 999;
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 0 1.4em;
  color: #fff;
  gap: 3em;

  /* create a media query for mobile devices */
  @media screen and (max-width: 768px) {
    display: flex;
  }

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30%;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30%;

    .notif {
      top: -540%;
      z-index: 1;

      ul {
        li {
          img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .indicator-not {
    /* make it a triangle */
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #f05a5b;
    position: absolute;
    top: -20px;
    margin-left: 5px;

  }

  .left,
  .right {
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    svg {
      font-size: 1.6rem;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        color: #8390fa;
      }
    }

    svg.active {
      color: #8390fa;
    }
  }

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    top: -35%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    &.active {
        img {
            outline: 6px solid #8390fa;
        }   
    }

    &:hover {
        img {
            outline: 6px solid #8390fa;
        }
    }

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      outline: 6px solid #1d2f6f;
      object-fit: cover;
      transition: all 0.3s ease-in-out;
    }
  }
`;
