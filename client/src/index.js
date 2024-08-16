import './sass/style.scss';
import { getAllAutobots } from './lib/requests';
import renderView from './lib/renderView';

renderView('form');

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker registered');
//       })
//       .catch(error => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }

