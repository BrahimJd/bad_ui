// PopUpTrigger.jsx - Update timing
const PopUpTrigger = () => {
  const { triggerPopup, popups } = usePopUps();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/home") return;

    const initialDelay = setTimeout(() => {
      if (popups.length < 6) {
        const types = ["facebook", "google", "windows"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        triggerPopup(randomType);
      }
    }, 10000);

    const interval = setInterval(() => {
      if (popups.length < 6) {
        const types = ["facebook", "google", "windows"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        triggerPopup(randomType);
      }
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [location.pathname, popups.length, triggerPopup]);

  return null;
};

export default PopUpTrigger;
