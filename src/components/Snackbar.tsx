import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseCircleFill } from 'react-icons/ri';

export const SnackbarMessage: React.FC<{ message: Message; open: boolean; onClose: () => void }> = ({
  message,
  open,
  onClose
}) => {
  const [mounted, setMounted] = React.useState<boolean>(false);

  const debouncedClose = React.useMemo(() => debounce(onClose, 3000), []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) debouncedClose();
  }, [open]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-8 flex w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          exit={{ opacity: 0, transform: 'translateY(100px)' }}
        >
          <div
            className=" relative mx-8 min-w-[200px] rounded-md bg-green-700 px-8 py-2 text-center text-lg font-semibold text-white"
            onMouseEnter={() => debouncedClose.cancel()}
            onMouseLeave={() => debouncedClose()}
          >
            {message.content}
            <button
              className="absolute top-1 right-1"
              onClick={() => {
                debouncedClose.cancel();
                onClose();
              }}
            >
              <RiCloseCircleFill />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

type Message = { content: string; type: 'success' | 'error' };

const SnackbarContext = React.createContext<{ push: (input: Message) => void }>({
  push: () => {
    return;
  }
});

export const SnackbarContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<Message>();

  const push = (input: Message) => {
    setMessage(input);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ push }}>
      {message && <SnackbarMessage message={message} open={open} onClose={() => setOpen(false)} />}
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  return snackbar;
};
