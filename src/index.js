import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/Weather/WeatherApp'

const rootElement = document.getElementById('root');
const appRoot = createRoot(rootElement);

appRoot.render(<App />);

