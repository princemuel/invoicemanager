import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../lib';

const ToastProvider = () => {
  const theme = useTheme();
  return <ToastContainer theme={theme} />;
};

export { ToastProvider };
