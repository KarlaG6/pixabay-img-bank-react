import { useState, useEffect } from 'react';
import Formulario from './components/Form';
import ImagesList from './components/ImagesList';

function App() {

  // state de la app
  const [busqueda, saveBusqueda] = useState('');
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return;
    
      const imagesPorPage = 30;
      const key = '20932597-45393696e3bafb389aa8e28a6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesPorPage}&page=${page}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImages(resultado.hits);

      // calcular total pages
      const calcularTotalPages = Math.ceil(resultado.totalHits / imagesPorPage);
      setTotalPages(calcularTotalPages);

      // Mover el frame hacia arriba automaticamente
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }
    consultarApi()
  }, [busqueda, page]); /* pasamos las dependencias */

  // definir la pagina anterior
  const prevPage = () => {
    const actualPage = page -1;
    if( actualPage === 0) return;
    setPage(actualPage)
  };
  // definir la pagina sigte
  const nextPage = () => {
    const actualPage = page +1;
    if( actualPage > totalPages) return;
    setPage(actualPage)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario saveBusqueda={saveBusqueda} />
      </div>
      <div className="row justify-content-center mb-5">
        <ImagesList images={images} />

        {(page === 1) ? null : (
          <button type="button" className="btn btn-info mr-1" 
                  onClick={prevPage}>&laquo; Anterior</button>
        )}

        {(page === totalPages) ? null : (
          <button type="button" className="btn btn-info" 
          onClick={nextPage}>Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
