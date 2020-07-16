import React from 'react';
import {
    Card,
    Image,
    Row,
    Col
} from 'react-bootstrap';
import BgPlaceholder from '../../assets/img/bg-placeholder.jpg';


const ListItem = (props) => {
    const data = props.data;
    const onCheckDetails = props.onCheckDetails;
    const onClick = () => {
        if (!!onCheckDetails) onCheckDetails(data);
    }
    return (
        <Col sm={12} md={4} lg={3} className="p-2">
            <Card className="clickable" onClick={onClick}>
                <Card.Img variant="top" src={data.Poster !== 'N/A' ? data.Poster : BgPlaceholder} className="dti-poster" />
                <Card.Body className="p-2">
                    <div className="dti-poster-card-body d-flex flex-column flex-wrap justify-content-start align-items-start">
                        <Card.Subtitle className="p-0 m-0">
                            {data.Title}
                        </Card.Subtitle>
                        <Card.Text className="p-0 pt-1 m-0 d-flex w-100 flex-row align-items-center">
                            <span className="mdi mdi-star text-warning"></span>
                            <span className="text-muted">{data.imdbRating === "N/A" ? "0" : data.imdbRating}/10</span>
                        </Card.Text>
                    </div>
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