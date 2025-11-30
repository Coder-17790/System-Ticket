import { useRouteError, isRouteErrorResponse } from "react-router-dom";

type Props = {
  message?: string;  // dành cho layout
};

export default function ErrorPage({ message }: Props) {
  // Lấy lỗi từ React Router (chỉ tồn tại khi dùng errorElement)
  const routeError = useRouteError();

  // ---------------------------------------------
  // 1️⃣ Nếu có routeError (errorElement mode)
  // ---------------------------------------------
  if (routeError) {
    if (isRouteErrorResponse(routeError)) {
      return (
        <div>
          <h1>Lỗi {routeError.status}</h1>
          <p>{routeError.statusText}</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Có lỗi xảy ra</h1>
        <p>{(routeError as Error)?.message}</p>
      </div>
    );
  }

  // ---------------------------------------------
  // 2️⃣ Nếu không có routeError → layout mode
  // ---------------------------------------------
  return (
    <div>
      <h1>Có lỗi xảy ra</h1>
      <p>{message ?? "Lỗi không xác định"}</p>
    </div>
  );
}
