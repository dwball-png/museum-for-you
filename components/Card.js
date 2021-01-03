const Card = (props) => {
    return (
        <div className='p-10 gap-10 grid place-items-center'>
            <a href={props.full} rel="noopener noreferrer" target="_blank"><img src={props.src} className='picture-frame'></img></a>
            <div className='divide-y divide-gray-900 text-center bg-white p-4 rounded-2xl shadow'>
                <h3 className='font-semibold text-4xl'>{props.title}</h3>
                <p className='text-lg'>{(props.artistDisplayName != '') ? props.artistDisplayName : 'Unidentifed Artist'}</p>
            </div>
        </div>
    );
};

export default Card;