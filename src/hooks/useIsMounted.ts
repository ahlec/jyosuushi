import { RefObject, useEffect, useRef } from "react";

function useIsMounted(): RefObject<boolean> {
  const isMounted = useRef<boolean>(true);
  useEffect(() => {
    isMounted.current = true;
    return (): void => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

export default useIsMounted;
