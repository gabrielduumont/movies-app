import React from 'react';
import { Card } from 'react-bootstrap';
import BackgroundImage1 from '../../assets/img/background/1.jpg';
import BackgroundImage2 from '../../assets/img/background/2.jpg';
import BackgroundImage3 from '../../assets/img/background/3.jpg';

const images = [BackgroundImage1, BackgroundImage2, BackgroundImage3];

export default function Layout(props) {
    const randomImagePosition = Math.floor(Math.random() * 3);
    return (
        <div className="w-100 h-100 dti-bg-wrapper" style={{ backgroundImage: "url(" + images[randomImagePosition] + ")" }}>
            <div className="w-100 h-100 dti-overlay">
                <div className="container py-3">
                    <Card>
                        <Card.Body>
                            {props.children}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}