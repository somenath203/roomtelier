"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailsContext } from "@/app/_context/userDetailsContext";

const Page = () => {

  const creditOptions = [
    {
      id: 1,
      credits: 5,
      amount: 0.99,
    },
    {
      id: 2,
      credits: 10,
      amount: 1.99,
    },
    {
      id: 3,
      credits: 25,
      amount: 3.99,
    },
    {
      id: 4,
      credits: 50,
      amount: 6.99,
    },
    {
      id: 5,
      credits: 100,
      amount: 9.99,
    },
  ];


  const [selectedCreditOption, setSelectedCreditOption] = useState(null);

  const { setUserDetailsGlobalContext } = useContext(UserDetailsContext);


  const handlePaymentSuccess = async () => {

    try {
      
      const res = await axios.patch("/api/credit-update", {
        creditsSelectedByUser: selectedCreditOption,
      });

      if (res?.data?.success) {

        setUserDetailsGlobalContext(res?.data?.userDataWithUpdatedCredits); 
        // Update the global context with the user's complete, latest details.

        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

      }

    } catch (error) {

      console.log(error);
      
    }

  };

  const handlePaymentCancel = () => {

    console.log("cancelled");

  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">

      <div className="mb-8 space-y-1">

        <h2 className="text-2xl font-bold tracking-tight">
          Choose the credit pack that works best for you
        </h2>

        <p className="text-muted-foreground">
          Buy more credits and transform your room with the magic of AI
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

        {creditOptions?.map((creditOption) => (

          <div
            key={creditOption.id}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl border bg-card p-6 text-card-foreground transition-colors ${
              selectedCreditOption?.id === creditOption.id
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/40"
            }`}
          >
            <p className="text-4xl font-bold">{creditOption.credits}</p>
            <p className="text-sm text-muted-foreground">Credits</p>

            <p className="mb-4 mt-3 text-lg font-semibold">
              $ {creditOption.amount}
            </p>

            <Button
              className="w-full hover:cursor-pointer"
              variant={
                selectedCreditOption?.id === creditOption.id
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedCreditOption(creditOption)}
            >
              Select
            </Button>

          </div>

        ))}

      </div>

      <div className="mt-20">
        {selectedCreditOption?.amount && (

          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions?.order?.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedCreditOption?.amount?.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
            onApprove={() => handlePaymentSuccess()}
            onCancel={() => handlePaymentCancel()}
          />

        )}

      </div>

    </div>
  );
};

export default Page;
