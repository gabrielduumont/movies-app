import React from 'react';
import {
    Card,
    Button,
    Image,
    Row,
    Col
} from 'react-bootstrap';

const ListItem = (props) => {
    const data = props.data;
    const onCheckDetails = props.onCheckDetails;
    const onClick = () => {
        if(!!onCheckDetails) onCheckDetails(data);
    }
    return (
        <Col sm={12} md={4} lg={3} className="p-2">
            <Card >
                <Card.Body>
                    <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                        {data.Poster !== 'N/A' ? <Image src={data.Poster} thumbnail fluid /> : null}
                    </div>
                    <Card.Title className="pt-2 mb-0">{data.Title}</Card.Title>
                    <Card.Text>
                        <small className="text-muted">Ano: {data.Year}</small>
                    </Card.Text>

                    <Button variant="primary" block onClick={onClick}><span className="mdi mdi-magnify"></span> Detalhes</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default function List(props) {
    const data = !!props.data ? props.data : [];
    const onCheckDetails = !!props.onCheckDetails ? props.onCheckDetails : null;
    return (
        <>
            <Row>
                {data.map(item => {
                    //console.log(item);
                    return (
                        <ListItem key={item.imdbID} data={item} onCheckDetails={onCheckDetails}/>
                    );
                })}
            </Row>
        </>
    );
}