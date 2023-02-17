import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function NavBar() {
  const router = useRouter();
  return (
    <Nav>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  padding: 20px;
  background-color: #333740;
  color: white;
  justify-content: space-around;
  position: fixed;
  width: 100vw;
  height: 60px;
`;
