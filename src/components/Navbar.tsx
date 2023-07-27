import React, { useState } from "react";
import styled from "@emotion/styled";
import MyAnimeImg from "../assets/images/myanime-logo.png";

const NavbarContainer = styled.nav`
  background-color: #000852;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  @media (min-width: 1000px) {
    padding: 25px;
  }
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
  color: #gray;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  font-weight: 600;

  &:hover {
    color: #gray;
    border-bottom: 2px solid #fff;
    transition: border-bottom 0.3s ease-in-out;
  }
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  background-color: #000852;
  color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  
  @media (min-width: 1000px) {
    display: none;
  }

`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 10px;
  width: 70px;
  color: #333;
  background-color: #fff;

  &:hover {
    background-color: #fff;
  }
`;

const NavbarDropdown = styled.div`
  display: none;
  @media (max-width: 600px) {
    position: relative;
    display: inline-block;
  }
`;

const ButtonDropdown = styled.button`
  display: none;
  background-color: #000852;
  border: 1px solid #000852;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #000852;
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
          <ButtonDropdown onClick={toggleDropdown}>
            {showDropdown ? "X" : "☰"}
          </ButtonDropdown>
          {showDropdown && (
            <DropdownOptions>
            <Option>My Collection</Option>
          </DropdownOptions>
          )}
        </NavbarDropdown>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
