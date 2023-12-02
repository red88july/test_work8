import '../../styles.css';
import axiosApi from '../../axiosApi.ts';
import {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

interface Quote {
    id: string,
    author: string;
    quote: string;
}

const Home = () => {
    const [quotsList, setQuoteslist] = useState<Quote[]>([]);

    const getPosts = async () => {
        const response = await axiosApi.get('quotes.json');
        return response.data;
    };

    const fetchData = async () => {
        try {
            const quotsObject = await getPosts();
            if (quotsObject && typeof quotsObject === 'object') {
                const quotesArray = Object.keys(quotsObject).map(key => ({
                    id: key,
                    author: quotsObject[key].quote.author,
                    quotes: quotsObject[key].quote.quotes,
                }));

              setQuoteslist(quotesArray);
            } else {
                console.error('Invalid response format:', quotsObject);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <>
            {quotsList.map((quote, index) => (
                <div key={index} className="d-flex justify-content-center align-items-center mt-5">
                    <div className="d-flex flex-column border border-3 border-success rounded-2 p-3 post-size">
                        <h4 className="mb-3">{quote.author}</h4>
                        <p className="mb-3">{quote.quote}</p>
                        <NavLink to={`/posts/${quote.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Read more</NavLink>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;