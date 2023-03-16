const MusicPlayer = ({src}) => {
    
    return ( 
        <iframe src={src} width="100%" height="800" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
     );
}
 
export default MusicPlayer;