import { useState, useEffect } from 'react';
import Formulario from './components/Form';
import ImagesList from './components/ImagesList';

function App() {

  // state de la app
  const [busqueda, saveBusqueda] = useState('');
  const [images, setImages] = useState([])

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return;
    
      const imagesPorPage = 30;
      const key = '20932597-45393696e3bafb389aa8e28a6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesPorPage}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImages(resultado.hits);
    }
    consultarApi()
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario saveBusqueda={saveBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ImagesList images={images} />
      </div>
    </div>
  );
}

export default App;
