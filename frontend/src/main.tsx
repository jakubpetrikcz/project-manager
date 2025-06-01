import React from 'react';
import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider } from 'react-redux';

import { store } from './stores/store.ts';
import App from './App.tsx';

import 'react-loading-skeleton/dist/skeleton.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SkeletonTheme baseColor='#E5E4E2' highlightColor='#C0C0C0'>
			<Provider store={store}>
				<App />
			</Provider>
		</SkeletonTheme>
	</React.StrictMode>
);
