import {useState, useEffect} from 'react';
import {NavLink,  useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';

interface Quote {
  id: string;
  category: string;
  author: string;
  quote: string;
}

const Quote = () => {
  const [quotesList, setQuotesList] = useState<Quote[]>([]);
  const {category} = useParams();

  const getQuotes = async () => {
    const response = await axiosApi.get('quotes.json');
    return response.data;
  };

  const fetchData = async () => {
    try {
      const quotesObject = await getQuotes();

      if (quotesObject && typeof quotesObject === 'object') {
        const quotesArray = Object.keys(quotesObject).map((key) => ({
          id: key,
          ...quotesObject[key].quotes,
        }));

        const filteredQuotes = category
          ? quotesArray.filter((quote) => quote.category === category)
          : quotesArray;

        setQuotesList(filteredQuotes);
      } else {
        console.error('Invalid response format:', quotesObject);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="d-flex mt-5">
      <ul className="d-flex flex-column ps-5">
        <ul className="d-flex flex-column ps-5">
          <NavLink
            key="all"
            to="/quotes/all"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            All
          </NavLink>
          <NavLink
            key="starwars"
            to="/quotes/starwars"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            Star Wars
          </NavLink>
          <NavLink
            key="famouspeople"
            to="/quotes/famouspeople"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            Famous People
          </NavLink>
          <NavLink
            key="saying"
            to="/quotes/saying"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            Saying
          </NavLink>
          <NavLink
            key="humor"
            to="/quotes/humor"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            Humor
          </NavLink>
          <NavLink
            key="motivational"
            to="/quotes/motivational"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 pb-2 cursor-pointer"
          >
            Motivational
          </NavLink>
        </ul>
      </ul>

      <div className="d-flex flex-column p-3">
        {quotesList.map((quote) => (
          <div key={quote.id} className="d-flex justify-content-center align-items-center ms-5">
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
  );
};

export default Quote;

