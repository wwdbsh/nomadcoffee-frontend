import styled from "styled-components";

const Button = styled.input`
    border:none;
    border-radius:3px;
    margin-top:12px;
    background-color:${(props) => props.theme.accent};
    color:#fff;
    text-align:center;
    padding:8px 0px;
    font-weight:600;
    width:100%;
    cursor:pointer;
    opacity:${props => props.disabled ? "0.2" : "1"}
`;

export default Button;