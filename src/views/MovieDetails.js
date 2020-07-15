import React, {  useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Image,
  Table
} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {
  Layout,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/actions/movies';

const parseMovieType = (type) => {
  switch (type.toLowerCase()) {
    case "movie":
      return "Filme";

    case "series":
      return "Série";

    case "episode":
      return "Episódio";

    default:
      return "Inválido";
  }
}

const translateMovieAttribute = (attr) => {
  switch (attr) {
    case "Rated":
      return "Censura";

    case "Released":
      return "Data de Lançamento";
    case "Runtime":
      return "Duração";
    case "Genre":
      return "Gênero(s)";
    case "Director":
      return "Diretor";
    case "Writer":
      return "Escritor";
    case "Actors":
      return "Atores";
    case "Plot":
      return "Enredo";
    case "Language":
      return "Linguagem";
    case "Country":
      return "País";
    case "Awards":
      return "Prêmios";
    case "Metascore":
      return "Metascore";
    case "imdbRating":
      return "Nota no imdb";
    case "imdbVotes":
      return "Número de Votos no imdb";
    case "DVD":
      return "DVD";
    case "BoxOffice":
      return "Bilheteria";
    case "Production":
      return "Produção";
    case "Website":
      return "Website";
    case "totalSeasons":
      return "Número de temporadas";
    default:
      return attr;
  }
}

const parseDetails = (detailsObj) => {
  let detailsArray = [];
  for (let i in detailsObj) {
    if (i !== "Ratings" && i !== "Title" && i !== "Year" && i !== "Type" && i !== "Poster" && i !== "imdbID" && i !== "Response") {
      detailsArray.push({
        id: i,
        label: translateMovieAttribute(i),
        value: detailsObj[i]
      });
    }

  }
  return detailsArray;
}

export default function MovieDetail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedMovie = useSelector(state => state.movies.selectedMovie);

  useEffect(() => {
    if (!selectedMovie) history.push("/");
  }, [selectedMovie, history]);

  const onNavigateBack = () => {
    const dispatchData = {
      movies: {
        selectedMovie: null
      }
    }
    dispatch(update(dispatchData));
    history.push("/");
  }

  if (!selectedMovie) {
    return null;
  }
  else {
    return (
      <Layout>
        <Row>
          <Col sm={12} md={12} lg={12} className="w-100 d-flex flex-row flex-wrap justify-content-between align-items-center">
            <Button variant="light" onClick={onNavigateBack}><span className="mdi mdi-arrow-left"></span> Voltar</Button>
            <h5 className=" m-0 text-muted">Detalhes do Titulo</h5>

          </Col>
        </Row>
        <hr />
        <Row>


          {
            selectedMovie.Poster !== 'N/A' ?
              <Col sm={12} md={3} lg={2}>
                <Image src={selectedMovie.Poster} thumbnail fluid />
              </Col>
              : null
          }
          <Col sm={12} md={9} lg={10}>

            <h4 className="w-100 m-0 pb-2">{selectedMovie.Title}</h4>
            <p className="w-100 m-0 text-muted">Ano: {selectedMovie.Year}</p>
            <p className="w-100 m-0 text-muted">Tipo: {parseMovieType(selectedMovie.Type)}</p>
          </Col>

          <Col sm={12} md={12} lg={12}>

            {
                !!selectedMovie ?
                  <>
                    <Table responsive>
                      <tbody>
                        {parseDetails(selectedMovie).map(item => {
                          return (
                            <tr key={item.id}>
                              <th width="30%">{item.label}</th>
                              <td>

                                {item.value}
                                {item.id === "imdbRating" ? "/10" : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>

                  </>
                  : null
            }
          </Col>
        </Row>
      </Layout>
    );
  }

}