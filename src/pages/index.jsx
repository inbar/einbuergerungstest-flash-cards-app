import {useEffect} from "react";
import { navigate } from "gatsby"

export default function RootPage(props) {
    useEffect(() => {
        navigate("/home");
    });
    
    return null;
}