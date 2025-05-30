import { Toaster } from "react-hot-toast";
import AppStoreWrapper, { AppStore } from "./Store/AppStore";
import AppContent from "./Components/AppContent";

function App() {
  return (
    <AppStoreWrapper>
      <AppContent />
      <Toaster position="bottom-right" reverseOrder={false} />
    </AppStoreWrapper>
  );
}

export default App;
