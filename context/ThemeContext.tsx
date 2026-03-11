import React, { createContext, useContext, useState } from "react";
import { ContentProps } from "@/components/full-modal/content-modal";

interface CartItem extends ContentProps {
  quantity: number;
}

interface Palette {
  bg: string;
  fg: string;
  muted: string;
  border: string;
  borderActive: string;
  cardBg: string;
  skeletonStart: string;
  skeletonEnd: string;
}

interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
  palette: Palette;
  cart: CartItem[];
  addToCart: (item: ContentProps) => void;
  removeFromCart: (title: string) => void;
  updateQuantity: (title: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const lightPalette: Palette = {
  bg: "white",
  fg: "black",
  muted: "gray.400",
  border: "gray.100",
  borderActive: "black",
  cardBg: "gray.50",
  skeletonStart: "gray.100",
  skeletonEnd: "gray.200",
};

const darkPalette: Palette = {
  bg: "#0a0a0a",
  fg: "white",
  muted: "whiteAlpha.500",
  border: "whiteAlpha.100",
  borderActive: "white",
  cardBg: "#111111",
  skeletonStart: "whiteAlpha.100",
  skeletonEnd: "whiteAlpha.200",
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleTheme: () => {},
  palette: lightPalette,
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleTheme = () => setDark((prev) => !prev);

  const addToCart = (item: ContentProps) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.title === item.title);
      if (existing) {
        return prev.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (title: string) => {
    setCart((prev) => prev.filter((i) => i.title !== title));
  };

  const updateQuantity = (title: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(title);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.title === title ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0,
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleTheme,
        palette: dark ? darkPalette : lightPalette,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
