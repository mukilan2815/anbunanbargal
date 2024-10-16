import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import HelpHandsIcon from "@mui/icons-material/Handshake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CommentIcon from "@mui/icons-material/Comment";
import EmailIcon from "@mui/icons-material/Email";
import BookIcon from "@mui/icons-material/Book";
import logonobg from "../Assets/logonobg.png";

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%);
  height: 100px;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(BookIcon)`
  margin-right: 10px;
  font-size: 2rem;
`;

const NavLinks = styled("div")`
  display: flex;
  @media (max-width: 960px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  color: white;
  margin-left: 20px;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: block;
  }
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    background: linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%);
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
`;

const navItems = [
  { to: "/", icon: <HomeIcon />, text: "முகப்பு" },
  { to: "/history", icon: <HistoryIcon />, text: "வரலாறு" },
  { to: "/services", icon: <HelpHandsIcon />, text: "சேவை" },
  { to: "/competitions", icon: <EmojiEventsIcon />, text: "போட்டிகள்" },
  { to: "/testimonials", icon: <CommentIcon />, text: "கருத்துகள்" },
  { to: "/contact", icon: <EmailIcon />, text: "தொடர்புகள்" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const body = document.body;
    body.style.paddingTop = "80px";
    const main = document.querySelector("main");
    if (main) {
      main.style.minHeight = "calc(100vh - 80px)";
    }
  }, []);

  return (
    <StyledAppBar position="fixed">
      <NavContainer>
        <Logo to="/">
          <img src={logonobg} width={100}  alt="" className="h-10 w-10" />
          <Typography variant="h6" component="div">
            நண்பர்கள் அன்பு நூலகம்
          </Typography>
        </Logo>
        <NavLinks>
          {navItems.map((item) => (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <StyledButton
                component={Link}
                to={item.to}
                startIcon={item.icon}
                color={location.pathname === item.to ? "secondary" : "inherit"}
              >
                {item.text}
              </StyledButton>
            </motion.div>
          ))}
        </NavLinks>
        <MobileMenuButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </MobileMenuButton>
      </NavContainer>
      <StyledDrawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        <CloseButton onClick={toggleMobileMenu}>
          <CloseIcon />
        </CloseButton>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.to}
              component={Link}
              to={item.to}
              onClick={toggleMobileMenu}
              selected={location.pathname === item.to}
            >
              <ListItemIcon style={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} style={{ color: "white" }} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </StyledAppBar>
  );
};

export default Navbar;
