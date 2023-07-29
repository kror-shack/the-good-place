import React, { useState } from "react";
import { ReactComponent as MainLogo } from "../../assets/svgs/header-logo.svg";

import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import "./MenuPage.scss";

interface FoodItem {
  name: string;
  price: number;
  description?: string;
}

interface Menu {
  [heading: string]: FoodItem[];
}

const MenuPage = () => {
  const [showFoodMenu, setShowFoodMenu] = useState(true);
  const foodMenu: Menu = {
    Appetizer: [
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
        description: "Deep-fried calamari rings served with tangy sauce.",
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
        description: "Deep-fried calamari rings served with tangy sauce.",
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
        description: "Deep-fried calamari rings served with tangy sauce.",
      },
    ],
    Pastas: [
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
        description: "Spaghetti served with rich tomato meat sauce and onions.",
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
        description: "Spaghetti served with rich tomato meat sauce and onions.",
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
        description: "Spaghetti served with rich tomato meat sauce and onions.",
      },
    ],
    Entrees: [
      {
        name: "Grilled Salmon",
        price: 15.99,
        description: "Freshly grilled salmon fillet with lemon butter sauce.",
      },
      {
        name: "Grilled Salmon",
        price: 15.99,
        description: "Freshly grilled salmon fillet with lemon butter sauce.",
      },
      {
        name: "Grilled Salmon",
        price: 15.99,
        description: "Freshly grilled salmon fillet with lemon butter sauce.",
      },
    ],
    Soups: [
      {
        name: "Creamy Tomato Basil",
        price: 4.99,
        description:
          "Rich and creamy tomato soup with fresh basil and lettuce.",
      },
      {
        name: "Creamy Tomato Basil",
        price: 4.99,
        description:
          "Rich and creamy tomato soup with fresh basil and lettuce.",
      },
      {
        name: "Creamy Tomato Basil",
        price: 4.99,
        description:
          "Rich and creamy tomato soup with fresh basil and lettuce.",
      },
    ],
    Salads: [
      {
        name: "Caesar Salad",
        price: 7.5,
        description: "Fresh romaine lettuce with Caesar dressing and croutons.",
      },
      {
        name: "Caesar Salad",
        price: 7.5,
        description: "Fresh romaine lettuce with Caesar dressing and croutons.",
      },
      {
        name: "Caesar Salad",
        price: 7.5,
        description: "Fresh romaine lettuce with Caesar dressing and croutons.",
      },
    ],
    Steaks: [
      {
        name: "New York Strip Steak",
        price: 19.99,
        description:
          "Juicy and tender New York strip steak cooked to perfection.",
      },
      {
        name: "New York Strip Steak",
        price: 19.99,
        description:
          "Juicy and tender New York strip steak cooked to perfection.",
      },
      {
        name: "New York Strip Steak",
        price: 19.99,
        description:
          "Juicy and tender New York strip steak cooked to perfection.",
      },
    ],
  };
  const drinkMenu: Menu = {
    Wine: [
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
      {
        name: "Crispy Calamari Delight",
        price: 5.5,
      },
    ],
    Coffee: [
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },

      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
    ],
    Gin: [
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
    ],
    Tonic: [
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
      {
        name: "Spaghetti Bolognese",
        price: 10.99,
      },
    ],
  };
  const [menu, setMenu] = useState<Menu>(foodMenu);

  function handleFoodClick() {
    setMenu(foodMenu);
    setShowFoodMenu(true);
  }

  function handleDrinkClick() {
    setMenu(drinkMenu);
    setShowFoodMenu(false);
  }

  return (
    <Container
      className="Menu-page"
      component="main"
      maxWidth="lg"
      sx={{ border: "1px solid #222", padding: "0rem 0.5rem" }}
    >
      <Typography variant="h4">Menu</Typography>
      <div className="vertical-line-container">
        <div className="vertical-line" />
      </div>
      <Tabs
        value={showFoodMenu ? 0 : 1}
        onChange={(event, newValue) =>
          newValue === 0 ? handleFoodClick() : handleDrinkClick()
        }
        centered
      >
        <Tab label="Food" />
        <Tab label="Drinks" />
      </Tabs>
      <div className="menu-container">
        <Grid container spacing={2}>
          {Object.entries(menu).map(([heading, items]) => (
            <Grid item xs={12} sm={6} md={showFoodMenu ? 4 : 6} key={heading}>
              <Paper>
                <Typography
                  sx={{ fontFamily: "Poppins", marginTop: "0.5rem" }}
                  variant="h5"
                  align="center"
                >
                  {heading}
                </Typography>
                <ul>
                  {items.map((item) => (
                    <li key={item.name}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        spacing={2}
                      >
                        <Typography
                          sx={{ fontFamily: "Poppins" }}
                          variant="subtitle1"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "Poppins" }}
                          variant="body2"
                          gutterBottom
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Stack>
                      {item.description && (
                        <Typography
                          sx={{ fontFamily: "Poppins-light-italic" }}
                          variant="body2"
                        >
                          {item.description}
                        </Typography>
                      )}
                      <Divider />
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default MenuPage;
