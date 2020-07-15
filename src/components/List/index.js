import React from 'react';
import {
    Card,
    Image,
    Row,
    Col
} from 'react-bootstrap';


const ListItem = (props) => {
    const data = props.data;
    const onCheckDetails = props.onCheckDetails;
    const onClick = () => {
        if (!!onCheckDetails) onCheckDetails(data);
    }
    return (
        <Col sm={12} md={4} lg={3} className="p-2">
            <Card className="clickable" onClick={onClick}>
                <Card.Body>
                    <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                        {data.Poster !== 'N/A' ? <Image src={data.Poster} thumbnail fluid /> : null}
                    </div>
                    <Card.Title className="pt-2 mb-0">{data.Title}</Card.Title>
                    <Card.Text className="p-0 py-1 m-0 d-flex w-100 flex-row align-items-center">
                        <span className="mdi mdi-star text-warning"></span>
                        <span className="text-muted">{data.imdbRating === "N/A" ? "0" : data.imdbRating}/10</span>
                    </Card.Text>
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
                    return (
                        <ListItem key={item.imdbID} data={item} onCheckDetails={onCheckDetails} />
                    );
                })}
            </Row>
        </>
    );
}