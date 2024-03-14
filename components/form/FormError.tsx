"use client";

import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface IFormErrorProps {
  error: string | null | undefined;
}

export const FormError = (props: IFormErrorProps) => {
  const { error } = props;

  const [formError, setFormError] = useState<string | null | undefined>(error);

  useEffect(() => {
    if (formError) {
      setTimeout(() => {
        setFormError(null);
      }, 3000);
    }
  }, [formError, error]);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  return (
    <div
      className={`animate__animated animate__fadeIn border border-[#C71D32] bg-[#FCD3D8] rounded-[8px] px-5 py-2  items-center lg:justify-center my-4 shadow-lg ${
        formError ? "flex" : "hidden"
      }`}
    >
      <span className="text-[#272727] leading-7 font-medium flex gap-3 items-center">
        <IoIosCloseCircle className="text-[#C71D32] text-2xl" />
        {formError}
      </span>
    </div>
  );
};
