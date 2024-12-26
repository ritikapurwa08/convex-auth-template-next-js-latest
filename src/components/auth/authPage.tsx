"use client";

import React, { useState } from "react";
import SignUpInputs from "./sign-up-inputs";
import SignInInputs from "./sign-in-inputs"; // Make sure to have this component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserButton from "./userButton";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <Card className="w-full max-w-md mx-4 md:mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            {isSignUp ? "Create a new account" : "Log in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isSignUp ? (
            <>
              <div className="space-y-4">
                <SignUpInputs />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <SignInInputs />
              </div>
            </>
          )}

          <UserButton />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={handleToggleForm}
                className="text-blue-500 hover:underline"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
