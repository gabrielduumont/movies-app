import React from 'react';
import Lottie from 'react-lottie';
import searchingAnimation from '../../assets/animations/searching.json';


export default function LoadingScreen(props) {

    const defaultAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: searchingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <>
            <div className="w-100 d-flex flex-column flex-wrap justify-content-center align-items-center">
                <Lottie
                    options={defaultAnimationOptions}
                    height={200}
                    width={200}
                />
            </div>
        </>
    );


}
