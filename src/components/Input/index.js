import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input `
    width: 100%;
    font-size:14px;
    border: 1px solid ${({theme})=> theme.colors.primary};
    background-color:${({theme}) => theme.colors.mainBg};
    color: ${({theme})=> theme.colors.contrastText};
    border-radius:${({theme}) => theme.borderRadius};
    padding: 15px;
    outline:0;
    margin:0px 10px 30px 0px;
    `;


export default function Input({placeholder, onChange, ...props}){
    return(
        <div>
            
            <InputBase 
            placeholder={placeholder}
            onChange={onChange}
            {...props} />
        </div>
    );

}