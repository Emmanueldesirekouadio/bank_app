interface NotificationProps {
  message: string;
  type: "success" | "error";
}

export const Notification = ({ message, type }: NotificationProps) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}
    >
      {message}
    </div>
  );
};
