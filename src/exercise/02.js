// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  // function getInitialState() {
  //   return window.localStorage.getItem('name') ?? initialName
  // }

  // const [name, setName] = React.useState(() => getInitialState())
  const [state, setState] = React.useState(() => {
    const valueLocalStorage = window.localStorage.getItem(key)
    if (valueLocalStorage) {
      return deserialize(valueLocalStorage)
    } else {
      return defaultValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(() => event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
