import Link from "next/link";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/index";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const Header = () => {
  const { totalPrice, cartCount } = useShoppingCart();
  const [stateTotalPrice, setStateTotalPrice] = useState();
  const [stateCartCount, setStateCartCount] = useState();

  useEffect(() => {
    setStateCartCount(cartCount);
    setStateTotalPrice(totalPrice);
  }, [totalPrice, cartCount]);
  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container xl:max-w-screen-xl mx-auto p-6 flex justify-between">
        <Logo />
        <Link
          href="/cart"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <div className="relative">
            <ShoppingCartIcon className="w-7 h-7 flex-shrink-0" />
          </div>
          <p className="text-lg">
            {formatCurrency(stateTotalPrice)}{" "}
            <span className="text-sm text-gray-500">({stateCartCount})</span>
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
