import { Accessor, createEffect, createSignal } from "solid-js";
import createBoolean from "./createBoolean";

/* 
  all the data we want to return as a "Device". (not final)
*/
interface Device {
  height: Accessor<number>;
  width: Accessor<number>;
  isMobile: Accessor<boolean>;
}

const useDevice = (): Device => {
  /*
    check to make sure the code is running on the client.
    if code is ran on the server, return a default "Device".
  */
  if (typeof window === "undefined")
    return {
      height: () => 0,
      width: () => 0,
      isMobile: () => false,
    };

  const [height, setHeight] = createSignal<number>(window.innerHeight);
  const [width, setWidth] = createSignal<number>(window.innerWidth);

  createEffect(() => {
    /*
      set the height and width to the client viewport size.
    */
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    /*
      use an event listener to check when the client viewport is resized and runs "handleResize" function. 
    */
    window.addEventListener("resize", handleResize);
    /*
      remove the event listener when the component is removed from the router.
    */
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const [isMobile, setIsMobile] = createBoolean(false);

  createEffect(() => {
    /*
      check the "userAgent" to see if the client is a mobile device and set "isMobile".
    */
    setIsMobile(/Mobile|Android|iPhone|iPad/i.test(window.navigator.userAgent));
  });

  /*
    return the gathered data as a "Device" object.
  */
  return { height, width, isMobile };
};

export default useDevice;
