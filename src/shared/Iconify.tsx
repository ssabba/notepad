import { Icon } from "@iconify/react";
import React, { FC } from "react";

type Props = {
  title: string;
  color?: string;
};

const Iconify: FC<Props> = ({ title, color }) => {
  return <Icon icon={title} color={color} height={26} width={26} />;
};

export default Iconify;
