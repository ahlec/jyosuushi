import React from "react";
import { Link } from "react-router-dom";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

interface ComponentProps {
  children: React.ReactNode;
  id: string;
}

function IntrasiteLink({ children, id }: ComponentProps): React.ReactElement {
  return <Link to={getCounterLink(id)}>{children}</Link>;
}

export default IntrasiteLink;
