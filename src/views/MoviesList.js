import React, { useState } from 'react';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import {
  Layout,
  SearchInput,
  Loading,
  List,
  AlphaSort,
  RatingSort
} from '../components';
import omdbAPI from '../services/omdb-api';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { update, clear } from '../redux/actions/movies';

export default function MoviesList(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const storedList = useSelector(state => state.movies.list);

  const maxYear = new Date().getFullYear();
  const minYear = 1895;

  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const initialMessage = "Os resultados da sua pesquisa aparecerão aqui";
  const [message, setMessage] = useState(initialMessage);
  const [messageColorClass, setMessageColorClass] = useState("text-info");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [movieList, setMovieList] = useState(storedList);

  const [alphaSort, setAlphaSort] = useState(null);
  const [ratingSort, setRatingSort] = useState(null);


  const onCheckDetails = (data) => {
    const dispatchData = {
      movies: {
        selectedMovie: {
          ...data
        }
      }
    }
    dispatch(update(dispatchData));
    history.push("/details");
  }

  const updateMoviesList = (data) => {
    const dispatchData = {
      movies: {
        list: data
      }
    }
    dispatch(update(dispatchData));
    setMovieList(data);
  }

  const onUpdateName = (name) => {
    if (!name) {
      setButtonDisabled(true);
      setMessageColorClass("text-danger");
      setMessage("Você deve informar um nome pra poder pesquisar");
    }
    else {
      if (name.length < 3) {
        setButtonDisabled(true);
        setMessageColorClass("text-danger");
        setMessage("O nome deve ter ao menos 3 caracteres.");
      }
      else {
        setButtonDisabled(false);
        setMessageColorClass("text-success");
        setMessage("Clique em pesquisar para efetuar sua pesquisa.")
      }
    }
    setMovieName(name);

  }
  const onUpdateYear = (year) => {
    let yearVal = year;
    if (!!year) {
      if (year.length >= 4) {
        if (!(parseInt(year) >= minYear && parseInt(year) <= maxYear)) {
          if (parseInt(year) < minYear) yearVal = minYear;
          else if (parseInt(year) > maxYear) yearVal = maxYear;
        }
      }
      else yearVal = minYear;
    }
    else yearVal = null;
    setMovieYear(yearVal);
  }


  const onSearchSuccess = (result) => {
    setAlphaSort(null);
    setRatingSort(null);
    if (!result.Search) {
      setIsSearching(false);

      setMessageColorClass("text-info");
      setMessage("Nenhum item encontrado.")
      updateMoviesList([]);
    }
    else {
      omdbAPI.search.batch(result.Search, (res) => {
        setIsSearching(false);
        updateMoviesList(res);
      }, onSearchError);

    }
  }

  const onSearchError = (error) => {
    setIsSearching(false);
    setMessageColorClass("text-danger");
    setMessage("Erro ao buscar informações na API.");
  }

  const updateAlphaSort = () => {
    const newValue = !!!alphaSort;
    setRatingSort(null);
    setAlphaSort(newValue);
    let sortedMovieList = Array.from(movieList);
    if (!!newValue) {
      sortedMovieList.sort((a, b) => {
        const x = a.Title.toLowerCase();
        const y = b.Title.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    }
    else {
      sortedMovieList.sort((a, b) => {
        const x = a.Title.toLowerCase();
        const y = b.Title.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      });
    }
    updateMoviesList(sortedMovieList);
  }
  const updateRatingSort = () => {
    const newValue = !!!ratingSort;
    setAlphaSort(null);
    setRatingSort(newValue);
    let sortedMovieList = Array.from(movieList);
    if (!!newValue) {
      sortedMovieList.sort((a, b) => {
        const x = parseFloat(a.imdbRating === "N/A" ? 0 : a.imdbRating);
        const y = parseFloat(b.imdbRating === "N/A" ? 0 : b.imdbRating);
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    }
    else {
      sortedMovieList.sort((a, b) => {
        const x = parseFloat(a.imdbRating === "N/A" ? 0 : a.imdbRating);
        const y = parseFloat(b.imdbRating === "N/A" ? 0 : b.imdbRating);
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      });
    }
    updateMoviesList(sortedMovieList);
  }

  const onSubmitSearch = () => {
    setMessage(null);
    setIsSearching(true);
    if (!!movieName && !!movieYear) {
      omdbAPI.search.byTitleAndYear(movieName, movieYear, onSearchSuccess, onSearchError);
    }
    else {
      omdbAPI.search.byTitle(movieName, onSearchSuccess, onSearchError);
    }
  }

  const onClearData = () => {
    dispatch(clear());
    setMessageColorClass("text-info");
    setMessage(initialMessage);
    updateMoviesList([]);
  }

  return (
    <Layout>
      <Row>
        <Col sm={12} md={12} lg={12}>

          <h1 className="w-100 m-0 pb-3">Olá visitante!</h1>
          <p>
            Seja bem vindo a pesquisa gratuita de filmes utilizando a <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a>.
          </p>
          <p>Utilize o formulário abaixo para realizar sua pesquisa.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={6}>
          <SearchInput
            placeholder="Nome do filme"
            controlId="formSearch_Name"
            onAfterChange={onUpdateName}
            required
            onSubmit={onSubmitSearch}
            minChar={3}
          />
        </Col>
        <Col sm={12} md={3} lg={3}>
          <SearchInput
            placeholder="Ano do filme"
            controlId="formSearch_Year"
            onAfterChange={onUpdateYear}
            type="year"
            onSubmit={onSubmitSearch}
          />
        </Col>
        <Col sm={12} md={3} lg={3} className="text-right">
          <Button variant="primary" onClick={onSubmitSearch} disabled={buttonDisabled}><span className="mdi mdi-cloud-search"></span> Pesquisar</Button>{" "}
          <Button variant="warning" onClick={onClearData} ><span className="mdi mdi-eraser"></span> Limpar</Button>
        </Col>
      </Row>
      {
        !!movieList && movieList.length > 0 ?
          <Row className="pt-2">
            <Col sm={12} md={6} lg={6}>
              <AlphaSort value={alphaSort} setValue={updateAlphaSort} />
            </Col>
            <Col sm={12} md={6} lg={6}>
              <RatingSort value={ratingSort} setValue={updateRatingSort} />
            </Col>
          </Row>
          : null
      }

      <Row>
        <Col sm={12} md={12} lg={12}>
          {
            !!message && movieList.length <= 0 ?

              <p className={"pt-3 " + messageColorClass}>
                {message}
              </p>
              :
              !!isSearching ?
                <Loading />
                :
                <>
                  <p className="text-muted"><small>Mostrando {movieList.length} resultados.</small></p>
                  <List data={movieList} onCheckDetails={onCheckDetails} />
                </>
          }
        </Col>
      </Row>

    </Layout>
  );
}