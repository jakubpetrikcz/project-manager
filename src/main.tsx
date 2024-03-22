import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<Provider store={store}>
				<App />
			</Provider>
		</SkeletonTheme>
	</React.StrictMode>
);
