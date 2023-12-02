  import axiosApi from "../../axiosApi.ts";
  import React, {useCallback, useState} from 'react';
  import {Quotes} from '../../types';
  import Spinner from "../Spinner/Spinner.tsx";
  import TypeWriter from '../../images/ic-typewriter.png';
  import '../../styles.css';


  const QuotesAdd: React.FC = () => {
      const [quotes, setQuotes] = useState<Quotes>({
          id: '',
          category: '',
          author: '',
          quote: '',
      });

      const [loading, setLoading] = useState(false);

      const inputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const randomId = `${Math.random()}`;
          const {name, value} = event.target;
          setQuotes((prevState) => ({
              ...prevState,
              id: randomId,
              [name]: value,
          }));
      }, []);


      const onFormSubmit = async (event: React.FormEvent) => {
          event.preventDefault();
          setQuotes({id: '', category: '', author: '', quote: ''});
          setLoading(true);

          const QuotesData = {
            quotes,
          };

          try {
              await axiosApi.post('quotes.json', QuotesData);
          } finally {
              setLoading(false);
          }
      };

      let form = (
          <form onSubmit={onFormSubmit} className="w-25 bg-light p-3 rounded-3">
              <div className="d-flex justify-content-center align-items-center">
                  <div className="w-50 pb-3 mb-5 text-center border-2 border-bottom border-secondary">
                      <img src={TypeWriter} alt="Typywriter icon"/>
                  </div>
              </div>
              <div className="mb-3">
                <div className="form-group mb-3">
                  <label htmlFor="type">Choose of category type</label>
                  <select
                    name="category"
                    id="type"
                    className="form-select"
                    value={quotes.category}
                    onChange={inputChange}
                  >
                    <option value="">Choise...</option>
                    <option value="All">All</option>
                    <option value="Star Wars">Star Wars</option>
                    <option value="Famous People">Famous People</option>
                    <option value="Saying">Saying</option>
                    <option value="Humor">Humor</option>
                    <option value="Motivational">Motivational</option>
                  </select>
                </div>
                  <label htmlFor="title-input" className="form-label">Add your name</label>
                  <input
                      name="author"
                      onChange={inputChange}
                      value={quotes.author}
                      type="text"
                      className="form-control"
                      id="author-input"
                      placeholder="Example: Obi-Van Kenobi" required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="input-message" className="form-label">Input your quote</label>
                  <textarea
                      value={quotes.quote}
                      name="quote"
                      onChange={inputChange}
                      className="form-control"
                      id="input-quote"
                      placeholder='Example:"You Were My Brother, Anakin. I Loved You."' required/>
              </div>
              <button type="submit" className="btn btn-success">Add quote</button>
          </form>
      );

      if (loading) {
          form = <Spinner/>;
      }

      return (
          <div className="mt-5 d-flex justify-content-center align-items-center">
              {form}
          </div>
      );
  };

  export default QuotesAdd;