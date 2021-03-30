import {useState} from 'react';
import Error from './Error';

const Form = ({saveBusqueda}) => {

    // valor reactivo del input
    const [termino, saveTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        // validar
        if (termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // enviar el termino de busqueda hacia el componente principal
        saveBusqueda(termino);
    }

    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input type="text" className="form-control form-control-lg" 
                            placeholder="Busca una imagen, ejemplo: futbol o café" 
                            onChange={e => saveTermino(e.target.value)}/>
                </div>
                <div className="form-group col-md-4">
                    <input type="submit" value="Buscar" 
                            className="btn btn-lg btn-danger btn-block" />
                </div>
            </div>

            { error ? <Error msg="Agrega un termino de busqueda" /> : null }
        </form>
     );
}
 
export default Form;