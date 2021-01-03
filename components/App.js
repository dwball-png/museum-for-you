import {useEffect, useState} from 'react'
import axios from 'axios'
import sampleSize from 'lodash.samplesize'
import startCase from 'lodash.startcase'
import Card from '../components/Card'

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [reqSearch, setReqSearch] = useState({total: 0, objectIDs: []});
    const [reqSearchQuery, setReqSearchQuery] = useState('landscape');
    const [oldQuery, setOldQuery] = useState(reqSearchQuery);
    const [reqObjects, setReqObjects] = useState([]);
    const [galleryObjects, setGalleryObjects] = useState([]);

    const doSearch = () => {
        setIsLoading(true);
        setIsError(false);
        axios.get(`/api/search?q=${reqSearchQuery}`).then(
            (response) => {setReqSearch(response.data)}
        ).catch((error) => {
            console.log(error);
            setIsError(true);
        });
    };

    const pickRandomObjects = () => {
        if (reqSearch.total >= 5) {
            const sample = sampleSize(reqSearch.objectIDs, 5);
            console.log(reqSearch.total);
            setReqObjects(sample);
        } else if (reqSearch.objectIDs == null) {
            setIsLoading(false);
        }
    }

    const doObjects = () => {
        if (reqObjects.length != 0) {
            console.log('req objects have loaded:' + reqObjects);
            const reqObjectUrls = reqObjects.map((object) => axios.get(`/api/painting?obj=${object}`));
            //console.log(reqObjectUrls);
            axios.all(
                reqObjectUrls
            ).then(response => {
                //console.log(response);
                const tempObjects = response.map((item) => item.data)
                setGalleryObjects(tempObjects)
                console.log(tempObjects);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsError(true);
            });
                
        }
    }

    useEffect(() => {
        doSearch();
    }, []);

    useEffect(() => {
        pickRandomObjects();
    }, [reqSearch.objectIDs])

    useEffect(() => {
        doObjects();
    }, [reqObjects])

    // useEffect(() => {
    //     if (randomObjects.length > 0) {
    //         console.log('gonna request');
    //         axios.get(`/api/painting?obj=${randomObjects[0]}`).then((response) => {console.log(response.data.primaryImageSmall); setTempUrl(response.data.primaryImageSmall); setIsLoading(false)})
    //     }
    // }, [randomObjects])

    let render;
    if (isError) {
        render = (
            <h2>
                Oops, something happened.
            </h2>
        )
    }
    else
    if (isLoading) {
        render = (
            <h2 className="text-center text-xl">
                Loading...
            </h2>
        )
    } else {
        if (reqSearch.total < 5) {
            render = (
                <p className="text-center text-lg">
                    You have a sparse museum! Not enough items related to '{oldQuery}' were returned. Please try a different keyword.
                </p>
            )
        } else {
            render = (
            //     <div>
            //         <img src={item.primaryImageSmall}>
            //             {/* {item.primaryImageSmall} */}
            //         </img>
            //         <p>{item.title}</p>
            //         <p>{(item.artistDisplayName != '') ? item.artistDisplayName : 'Unknown'}</p>
            //     </div>
                <div className="bg-gradient-to-b from-opal to-eggshell">
                    {/* <div className='min-h-screen bg-gray-900'></div> */}
                    {galleryObjects.map((item) => (
                        <Card
                            src={item.primaryImageSmall}
                            full={item.primaryImage}
                            // title={item.title.split(' ').map((word)=>word[0].toUpperCase() + word.substr(1)).join(' ')}
                            title={item.title}
                            artistDisplayName={item.artistDisplayName}
                        ></Card>
                        
                    ))}
                </div>
            )
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setReqSearch({total: 0, objectIDs: []})
        setOldQuery(reqSearchQuery);
        doSearch();
    }
    
    return (
        <>
            <div className="grid place-items-center pb-4">
                <form onSubmit={onSubmit} className="space-x-2">
                    <input className="border-2 p-2" type='text' value={reqSearchQuery} onChange={(event) => setReqSearchQuery(event.target.value)}></input>
                    <input className="py-2 px-4 rounded cursor-pointer transform hover:scale-105" type='submit' value='submit'></input>
                </form>
                {/* <button className="p-4 text-white bg-blue-400 rounded-xl" onClick={doSearch}>Search</button> */}
            </div>
            {render}
        </>
    );
};

export default App;
