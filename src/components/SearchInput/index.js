import React, { useState } from 'react';
import {
    Form
} from 'react-bootstrap';

export default function SearchInput(props) {

    const controlId = !!props.controlId ? props.controlId : "form_";
    const required = !!props.required ? props.required : false;
    const type = !!props.type ? props.type : "text";
    const placeholder = !!props.placeholder ? !!required ? props.placeholder + " (obrigatório)" : props.placeholder : "";
    const maxYear = type === "year" ? new Date().getFullYear() : null;
    const minYear = type === "year" ? 1895 : null;
    const minChar = !!props.minChar ? props.minChar : null;
    const inputProps = type === "year" ? { min: minYear, max: maxYear } : null;
    const [error, setError] = useState(null);
    const [value, setValue] = useState("");

    const onBeforeChange = !!props.onBeforeChange ? props.onBeforeChange : null;
    const onAfterChange = !!props.onAfterChange ? props.onAfterChange : null;

    const onChange = (e) => {
        let newVal = e.target.value;
        if (!!onBeforeChange) onBeforeChange(newVal);
        if (!!required) {
            if (!newVal) setError("Este campo é obrigatório!");
            else setError(null);
            if(!!minChar){
                if(newVal.length < minChar) setError("Você precisa preencher pelo menos "+ minChar + " caracteres.");
                else setError(null);
            }
        }
        if (type === "year") {
            if (!!newVal && newVal.length >= 4 && !(parseInt(newVal) >= minYear && parseInt(newVal) <= maxYear)) {
                if (parseInt(newVal) < minYear) newVal = minYear;
                else if (parseInt(newVal) > maxYear) newVal = maxYear;
            }
        }
        if (!!onAfterChange) onAfterChange(newVal);
        setValue(newVal);
    }

    const onBlur = () => {
        let newVal = value;
        if (!!required) {
            if (!newVal) setError("Este campo é obrigatório!");
            else setError(null);
            if(!!minChar){
                if(newVal.length < minChar) setError("Você precisa preencher pelo menos "+ minChar + " caracteres.");
                else setError(null);
            }
            
        }
        if (type === "year") {
            if (!!newVal ) {
                if(newVal.length >= 4){
                    if (!(parseInt(newVal) >= minYear && parseInt(newVal) <= maxYear)) {
                        if (parseInt(newVal) < minYear) newVal = minYear;
                        else if (parseInt(newVal) > maxYear) newVal = maxYear;
                    }
                }
                else newVal = minYear;
            }
        }
        setValue(newVal);
    }

    const onSubmit = !!props.onSubmit ? props.onSubmit : null;

    const onKeyPress = (e) => {
        if(e.charCode === 13 && !!onSubmit) onSubmit();
    }
    return (
        <Form.Group controlId={controlId} >
            <Form.Control {...inputProps} type={type === "year" ? "number" : type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} onKeyPress={onKeyPress} />
            {
                !error ? null :
                    <Form.Text className="text-danger px-1">
                        {error}
                    </Form.Text>
            }
        </Form.Group>
    );
}