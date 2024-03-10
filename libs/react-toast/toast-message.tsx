import { FaCircleCheck } from "react-icons/fa6";
import { FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { IMakeToastOptions } from "./toast";

interface ToastMessageProps extends IMakeToastOptions {
  onClose: () => void;
}

export const ToastMessage = (props: ToastMessageProps) => {
  const { message, type } = props;

  const getToastItems = () => {
    switch (type) {
      case "success":
        return {
          icon: <FaCircleCheck className="text-[#0D9D31] text-xl" />,
          style: { border: "1px solid #0D9D31 ", backgroundColor: "#CFF2D8" },
          className: "border-[#0D9D31] bg-[#CFF2D8]",
          value: "Success",
        };
      case "error":
        return {
          icon: <MdCancel className="text-[#C71D32] text-xl" />,
          style: { border: "1px solid #C71D32 ", backgroundColor: "#FCD3D8" },
          className: "border-[#C71D32] bg-[#FCD3D8]",
          value: "Error",
        };
      case "info":
        return {
          icon: (
            <FaInfoCircle style={{ color: "#0F27BD" }} className="text-xl" />
          ),
          style: { border: "1px solid #0F27BD ", backgroundColor: "#E7E9F8" },
          className: "border-[#0F27BD] bg-[#E7E9F8]",
          value: "Info",
        };
      case "warning":
        return {
          icon: <FaExclamationCircle className="text-[#DFD407] text-xl" />,
          style: { border: "1px solid #DFD407 ", backgroundColor: "#FCFBE6" },
          className: "border-[#DFD407] bg-[#FCFBE6]",
          value: "Warning",
        };
    }
  };

  return (
    <div
      style={{
        ...getToastItems().style,
        width: 300,
      }}
      className={`animate__animated animate__fadeInRight h-[50px] py-4 px-5  rounded-md shadow-md flex items-center gap-2 text-[#272727] border  ${
        getToastItems().className
      } `}
    >
      {getToastItems().icon}

      <p className="text-sm font-normal">
        {getToastItems().value}!. {message}
      </p>
    </div>
  );
};
