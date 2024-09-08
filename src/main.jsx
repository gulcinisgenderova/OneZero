import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// main.jsx
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import store from './redux/store'; // Uzantısız dosya yolunu kontrol edin
// import { Provider } from 'react-redux';

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
