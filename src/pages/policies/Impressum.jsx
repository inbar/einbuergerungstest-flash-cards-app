import React from "react";
import MetaTags from "../../components/MetaTags";

function Impressum(props) {
    return (
        <React.Fragment>
            <MetaTags location={props.location}
                titleSuffix='Impressum'
                description='Impressum for the Einbürgerungstest App'
            />
            <h2 className="uk-heading-divider uk-heading-bullet">Impressum</h2>
            <p>
                <b>Anbieter:</b><br/>
                Inbar Dagan<br/>
                c/o AutorenServices.de<br/>
                Birkenallee 24<br/>
                36037 Fulda<br/>
                <br/>
                einbuergerungstest.app (at) gmail.com
                
            </p>
        </React.Fragment>
    )
}

export default Impressum;