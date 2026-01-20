import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "@digdir/designsystemet-css"; /* imported only once */
import "@digdir/designsystemet-css/theme"; /* or your theme */

import { Button } from "@digdir/designsystemet-react";
import { Card } from "@digdir/designsystemet-react";
import { Heading } from "@digdir/designsystemet-react";
import { Paragraph } from "@digdir/designsystemet-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Button variant='primary' data-color='accent'>Min knapp</Button>;

      <div>
        <h1>Hello World!</h1>
        <Button variant='primary'>I'm a button!</Button>

        {/* <Card>
          <Card.Block className='ds-heading'>Title</Card.Block>
          <Card.Block>Content</Card.Block>
          <Card.Block>Optional footer</Card.Block>
        </Card> */}

        <Card style={{ maxWidth: '320px' }} data-color='accent' data-variant='tinted'>
          <Heading>Lykkeland Primary School</Heading>
          <Paragraph>
            Lykkeland Primary School is a safe and inclusive local school where
            play, learning and curiosity go hand in hand.
          </Paragraph>
          <Paragraph data-size='sm'>Solslett Municipality</Paragraph>
        </Card>

        {/* <Card data-color='neutral'>
          <Heading>Lykkeland Primary School</Heading>
          <Paragraph>
            Lykkeland Primary School is a safe and inclusive local school where
            play, learning and curiosity go hand in hand.
          </Paragraph>
          <Paragraph data-size='sm'>Solslett Municipality</Paragraph>
        </Card> */}



        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      <h2>CSS direkte:</h2>
      <button className="ds-button" data-variant="primary" data-color="accent">Click me</button>

      <div
        className="ds-card"
        data-variant="default"
        data-color="accent"
        style={{ maxWidth: '320px' }}
      >
        <h2 className="ds-heading">Lykkeland Primary School</h2>
        <p className="ds-paragraph" data-variant="default">
          Lykkeland Primary School is a safe and inclusive local school where
          play, learning and curiosity go hand in hand.
        </p>
        <p className="ds-paragraph" data-variant="default" data-size="sm">Solslett Municipality</p>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
