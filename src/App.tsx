import * as React from 'react';
import Footer from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
