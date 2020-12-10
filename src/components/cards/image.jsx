import React from 'react'

import {useImage} from "../../hooks/ImageHooks";
import Img from "gatsby-image";

export default function Image(props) {
    
    const question = props.question;
    const image = useImage(question.qid, question.metadata.region);
    
    if (image === undefined) {
        return false;
    }
    
    return (
        <div className="card__image__container uk-card-media-top">
            <Img 
                fluid={image.fluid}
                alt={`question ${question.id}`}
            />
        </div>
    )
}