import { useState } from "react";
import { ReactComponent as MainLogo } from "../../assets/svgs/header-logo.svg";
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
    <div className="Menu-page">
      <h2>Menu</h2>
      <div className="subheader">
        <div className="line"></div>
        <div className="button-container">
          <button
            className={showFoodMenu ? "selected-button" : ""}
            onClick={handleFoodClick}
          >
            Food
          </button>
          <button
            className={showFoodMenu ? " " : "selected-button"}
            onClick={handleDrinkClick}
          >
            Drinks
          </button>
        </div>
      </div>
      <div className="menu-container">
        <MainLogo />

        <div className={showFoodMenu ? "menu" : "drinks-menu"}>
          {Object.entries(menu).map(([heading, items]) => (
            <div key={heading} className="menu-section">
              <h2>{heading}</h2>
              <ul className="food-list">
                {items.map((item) => (
                  <li key={item.name}>
                    <div className="item-title">
                      <h3>{item.name}</h3>
                      <p className="price">${item.price.toFixed(2)}</p>
                    </div>
                    {item.description && (
                      <p className="description">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
