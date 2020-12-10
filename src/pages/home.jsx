import React from 'react'
import ExternalLink from "./../components/ExternalLink";
import MetaTags from "./../components/MetaTags";
import {Link} from "gatsby"
import regionHooks from "../hooks/RegionHooks";
import {PATHS} from "../components/layout";

function Home(props) {
    const regions = regionHooks();
    
    return (
        <React.Fragment>
            <MetaTags location={props.location}
                titleSuffix='Home'
                description='General info about preparing for the german Einbürgerungstest using the flash cards app.'
            />
            
            <h2 className="uk-heading-divider uk-heading-bullet">The Naturalisation Test ("Einbürgerungstest")</h2>
            <p>
                The test consists of a total pool of 310 questions, of which 300 are general questions and 10 questions relate to the Federal Land (Bundesland) in which you live.
                <br/><br/>
                In the examination you will be given a test paper containing 33 questions. You have 60 minutes to answer the questions, and must select the correct answer to each question from four possible answers. If you answer a minimum of 17 questions correctly, you have passed the test. You will then receive a certificate with your test results from the Federal Office for Migration and Refugees.
                <br/><br/>
                30 questions relate to the subject areas of “Living in a democracy”, “History and responsibility” and “People and society”. Three test questions will be asked about the Federal Land in which you are registered as having your first place of residence.
                
                <br/><br/>
                Taken from: <ExternalLink className="uk-link-text" href="https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html"><i>Naturalisation in Germany</i> in bamf.de</ExternalLink>
            </p>

            <h2 className="uk-heading-divider uk-heading-bullet">Prepare</h2>
            <p>
                To prepare yourself for the test, you need to learn the 300 general questions, plus the 10 "Federal Land" (Bundesland, "regional") questions for your Bundesland.
                <br/>
                Out of those 310 questions, 33 will be selected (as is) and will be presented to you as your test. 
            </p>
                <div className="uk-grid-small uk-width-large" data-uk-grid>
                    <div className="uk-width-expand" data-uk-leader><b>General questions:</b></div>
                    <div>
                        <Link to={PATHS.flashcards.general} className="uk-link-text">Flash Cards</Link><br/>
                    </div>
                </div>
                {
                    regions.map(region => {
                        return (
                            <div className="uk-grid-small uk-width-large" data-uk-grid key={region.regionName}>
                                <div className="uk-width-expand" data-uk-leader><b>{region.readableName}:</b></div>
                                <div>
                                    <Link to={region.regionPathFlashCards} className="uk-link-text">Flash Cards</Link> | <Link to={region.regionPathFlashCards} className="uk-link-text">Take Test</Link><br/>
                                </div>
                            </div>
                        )
                    })
                }
            <h2 className="uk-heading-divider uk-heading-bullet">Data Sources</h2>
            <p>
                <ExternalLink className="uk-link-text" href="http://www.i-punkt-projekt.de/downloads-miteinander-leben">http://www.i-punkt-projekt.de</ExternalLink>
            </p>

            <h2 className="uk-heading-divider uk-heading-bullet">Help Us Improve!</h2>
            <p>
                Find a typo? Does one of the questions have an incorrect answer? Something missing?<br/>
                If you encounter anything wrong, or want to make a suggestion, please open an issue here:  <ExternalLink href="https://github.com/inbar/einbuergerungstest-flash-cards-app/issues" className="uk-link-text">https://github.com/inbar/einbuergerungstest-flash-cards-app/issues</ExternalLink><br/> 
                <br/>
                Apologies for any inaccuracies. See the disclaimer below.
            </p>
            
            {/*TODO:*/}
            {/*<h2 className="uk-heading-divider uk-heading-bullet">Support Us</h2>*/}
            {/*<p>*/}
            {/*    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.*/}
            {/*</p>*/}
            
            <h2 className="uk-heading-divider uk-heading-bullet">Disclaimer</h2>
            <p>
                As mentioned in <a className="uk-link-text">Data Sources</a> above, the questions/answers here were taken from the official sources. 
                Despite careful handling and processing of the data, some errors might exist in the end result.
                <br/>                
                This site and its content should be used as an assisting learning tool in conjunction with the original test preperation material
                from the qualified sources.

                <br/><br/>
                This site takes no responsibility and makes no guarantee on the accuracy of the content and any eventual test results.

                <br/><br/>
                <Link to={`/${PATHS.disclaimer}`} className="uk-link-text">Full Disclaimer</Link>
            </p>


        </React.Fragment>
    )
}

export default Home;