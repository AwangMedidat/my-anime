import React, { useState } from "react";
import styled from "@emotion/styled";
import MyAnimeImg from "../assets/images/myanime-logo.png";

const NavbarContainer = styled.nav`
  background-color: #cee6f3;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NavbarTitle = styled.h1`
  color: #333;
  margin: 0;
  font-size: 24px;
`;

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavbarItem = styled.li`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    margin-left: 20px;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const NavbarLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  font-weight: 600;
  &:hover {
    border-bottom: 2px solid #fff;
    transition: border-bottom 0.3s ease-in-out; /* Add transition */
  }
`;

const NavbarDropdown = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

const ButtonDropdown = styled.button`
  display: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 600px) {
    display: block;
  }
`;

const MyAnimeImage = styled.img`
  max-width: 100%;
  max-height: 25px;
  border-radius: 5px;
`;

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <NavbarContainer>
      <NavbarTitle>
        <MyAnimeImage src={MyAnimeImg} alt="My Anime" />
      </NavbarTitle>
      <NavbarList>
        <NavbarItem key={1}>
          <NavbarLink href="#">My Collection</NavbarLink>
        </NavbarItem>

        <NavbarDropdown>
          <ButtonDropdown onClick={toggleDropdown}>☰</ButtonDropdown>
          {showDropdown && (
            <div>
              <NavbarLink key={1} href="#">
                My Collection
              </NavbarLink>
            </div>
          )}
        </NavbarDropdown>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
