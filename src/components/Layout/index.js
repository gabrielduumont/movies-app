import React from 'react';
import { Card } from 'react-bootstrap';


export default function Layout(props) {
    return (
        <div className="w-100 h-100" >
            <div className="container py-3">
                <Card>
                    <Card.Body>
                        {props.children}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}