import React from 'react';
import {
    Button,

} from 'react-bootstrap';

export default function AlphaSort(props) {

    const value = props.value;
    const setValue = props.setValue;
    const colorClass = value === null ? "outline-dark" : "outline-info";
    const iconClass = !!value ? "mdi mdi-sort-alphabetical-ascending" : value === false ? "mdi mdi-sort-alphabetical-descending" : "mdi mdi-sort-alphabetical-ascending";
    const title = !!value ? "Ordenado alfabeticamente de maneira crescente" : value === false ? "Ordenado alfabeticamente de maneira decrescente" : "Não ordenado alfabeticamente";
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