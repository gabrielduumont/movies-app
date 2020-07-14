import React from 'react';
import {
    Button,

} from 'react-bootstrap';

export default function RatingSort(props) {

    const value = props.value;
    const setValue = props.setValue;
    const colorClass = value === null ? "outline-dark" : "outline-info";
    const iconClass = !!value ? "mdi mdi-sort-ascending" : value === false ? "mdi mdi-sort-descending" : "mdi mdi-sort-ascending";
    const title = !!value ? "Ordenado por nota média de maneira crescente" : value === false ? "Ordenado por nota média de maneira decrescente" : "Não ordenado por nota média";
    const onClick = () => {
        if(!!setValue) setValue();
    }


    return (
        <div className="mb-2">
            <Button variant={colorClass} block onClick={onClick} title={title}>
                <span className={iconClass}></span> {title}
            </Button>
        </div>
    );
}