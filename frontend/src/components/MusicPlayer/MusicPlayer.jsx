import "./MusicPlayer.css"

const MusicPlayer = ({src}) => {
    
    return ( 
        <iframe src={src} width="45%" height="800" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
     );
}
 
export default MusicPlayer;