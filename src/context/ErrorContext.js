import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [visible, setVisibility] = useState(false);
  const [type, setType] = useState('danger'); // 'danger' for error, 'success' for success

  const showError = (message, type = 'danger') => {
    setVisibility(true);
    setError(message);
    setType(type);
  };
  const hideError = () => setVisibility(false);
  return (
    <ErrorContext.Provider value={{ error, type, showError, hideError , visible}}>
      {children}
    </ErrorContext.Provider>
  );
};
