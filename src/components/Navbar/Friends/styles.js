import styled from 'styled-components';

export const Container = styled.div`
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

  h1 {
    margin-left: .5em;
  }

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
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;

        a {
            color: #000;
            text-decoration: none;

            li {
            display: flex;
            align-items: center;
            gap: .5em;
            width: 100%;
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            transition: all 0.2s;
            font-size: 1rem;
            cursor: pointer;
            color: #000;

            &:hover {
                background-color: #f05a5b;
                color: #fff;
            }
        }
        }

        
    }
`