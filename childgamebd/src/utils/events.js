const listeners = {};

export const subscribe = (event, cb) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(cb);
  return () => {
    listeners[event] = (listeners[event] || []).filter((l) => l !== cb);
  };
};

export const emit = (event, payload) => {
  (listeners[event] || []).forEach((cb) => cb(payload));
};
