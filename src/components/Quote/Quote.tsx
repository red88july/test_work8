import '../../styles.css';
import axiosApi from '../../axiosApi.ts';
import {useState, useEffect} from 'react';
import '../../styles.css';
// import {NavLink} from "react-router-dom";

interface Quote {
    id: string,
    author: string;
    quote: string;
}

const Quote = () => {
    const [quotesList, setQuoteslist] = useState<Quote[]>([]);

    const getQuotes = async () => {
        const response = await axiosApi.get('quotes.json');
        return response.data;
    };

    const fetchData = async () => {
        try {
            const quotsObject = await getQuotes();

            if (quotsObject && typeof quotsObject === 'object') {
                const quotesArray = Object.keys(quotsObject).map(key => ({
                    id: key,
                    author: quotsObject[key].quotes.author,
                    quote: quotsObject[key].quotes.quote,
                }));

                setQuoteslist(quotesArray);

                console.log(quotesArray);
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
            <div className="d-flex mt-5">
                <ul className="d-flex flex-column ps-5">
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">All</a>
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">Star Wars</a>
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">Famous People</a>
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">Saying</a>
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">Humor</a>
                    <a className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer">Motivational</a>
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">All</NavLink>*/}
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Star Wars</NavLink>*/}
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Famous People</NavLink>*/}
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Saying</NavLink>*/}
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Humor</NavLink>*/}
                    {/*<NavLink to={`/quotes/${quotes.id}`} className="btn-read w-25 btn btn-success text-start ps-3">Motivational</NavLink>*/}
                </ul>

              <div className="d-flex flex-column p-3">
                {quotesList.map((quote, index) => (
                  <div key={index} className="d-flex justify-content-center align-items-center ms-5">
                    <div className="d-flex flex-column border border-3 border-success rounded-2 p-3 quote-size">
                      <h4 className="mb-3">{quote.author}</h4>
                      <p className="mb-3">{quote.quote}</p>
                      <div className="d-flex justify-content-end gap-3">
                        <button  className="w-25 btn btn-danger text-center ps-3">Delete
                        </button>
                        <button className="w-25 btn btn-primary text-center ps-3">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


        </>
    );
};

export default Quote;