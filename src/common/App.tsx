import { HydrationScript } from 'solid-js/web'

import { Counter } from './Counter'

const App = (props: { url?: string }) => (
  <html>
    <head>
      <title>principia-solid-template SSR</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script type="module" src="/js/client.js" async></script>
      <HydrationScript />
    </head>
    <body>
      <div>Hello, principia.ts!</div>
      <span>{props.url}</span>
      <Counter />
    </body>
  </html>
)

export default App
