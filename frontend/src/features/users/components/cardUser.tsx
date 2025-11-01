import { User } from "@/types";
import "./CardUser.scss";

type CardUserProps = {
    info?: User;

};

const CardUser = ({
    info,
}: CardUserProps) => {

  return <div className="st-card">
    <div className="st-card__header">
      <h3 className="st-card__title">{info?.fullName}</h3>
    </div>
    <div className="st-card__body">
      <p><strong>Email:</strong> {info?.email}</p>
      <p><strong>Trạng thái:</strong> {info?.isActive ? "Hoạt động" : "Không hoạt động"}</p>
      <p><strong>Ngày tạo:</strong> {info ? new Date(info.createdAt).toLocaleDateString() : ""}</p>
    </div>
  </div>;
};

export default CardUser;