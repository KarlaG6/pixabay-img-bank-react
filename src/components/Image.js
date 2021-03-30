const Image = ({image}) => {

    // extraer valores
    const {largeImageURL, likes, previewURL, tags, views} = image;

    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top mb-4" />
            </div>
        </div>
    );
}
 
export default Image;