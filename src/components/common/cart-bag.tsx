"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import CartList from "../cart/cart-list";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import api from "@/api";

function CartBag() {
  const { cart, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuth();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price =
        item.medicine.price -
        (item.medicine.price * item.medicine.discountPercentage) / 100;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cart.reduce((total, item) => {
      const discount =
        (item.medicine.price * item.medicine.discountPercentage) / 100;
      return total + discount * item.quantity;
    }, 0);
  };

  const placeOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to place order");
      redirect("/login");
    }

    try {
      const orderResponse = await api.post("/orders/create", {
        userId: user._id,
        medicines: cart,
        totalPrice: calculateTotalPrice(),
        totalDiscount: calculateTotalDiscount(),
      });

      if (orderResponse.data.order) {
        const orderId = orderResponse.data.order._id;

        const paymentResponse = await api.post("/orders/payment/initiate", {
          orderId,
        });

        if (paymentResponse.data.url) {
          clearCart();
          window.location.href = paymentResponse.data.url;
        }
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Try again later.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative h-11 w-11 flex items-center justify-center text-primary rounded-xl bg-primary/10">
          <ShoppingBag size={20} />
          <span className="absolute -top-1.5 -right-1 w-6 h-5 aspect-square text-[12px] flex items-center justify-center bg-primary text-white rounded-full ml-2">
            {cart.length}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col justify-between p-0">
        <SheetHeader className="p-4 space-y-0">
          <SheetTitle className="inline-flex items-center gap-2">
            <ShoppingBag size={20} /> Shooping Cart
          </SheetTitle>
          <SheetDescription>
            Continue shopping to add more items.
          </SheetDescription>
        </SheetHeader>
        <Separator />

        {cart.length > 0 && <CartList />}

        {cart.length === 0 && (
          <div className="flex-1 p-4">
            <div className="flex flex-col items-center">
              <img
                className="max-w-[290px] mx-auto"
                src="/images/empty-state.png"
                alt="Empty Cart"
                width={290}
                height={290}
                priority={true}
              />
              <h1 className="font-medium text-xl">Your cart is empty</h1>
              <p className="font-light text-sm">
                Add items to it now. Continue shooping..
              </p>
            </div>
          </div>
        )}

        <Separator />
        <SheetFooter className="px-4 pb-4">
          <div className="w-full flex flex-col gap-3">
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Total:</p>
                <p className="font-semibold">
                  ৳{calculateTotalPrice().toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Total Discount:</p>
                <p className="line-through">
                  ৳{calculateTotalDiscount().toFixed(2)}
                </p>
              </div>
            </div>

            <SheetClose asChild>
              <Button onClick={placeOrder} className="w-full h-12">
                Checkout
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartBag;
