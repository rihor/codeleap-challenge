import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { Roboto } from 'next/font/google'

import { persistor, store } from '~/redux/store'
const roboto = Roboto({ subsets: ['latin'], weight: ["400", "700"], variable: "--font-roboto" })

export default function App({ Component, pageProps }: AppProps) {
  return (
		<div
			className={`${roboto.variable}`}
			style={{
				minHeight: "100vh",
			}}
		>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
		</div>
	);
}
