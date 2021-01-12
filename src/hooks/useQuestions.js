import {graphql, useStaticQuery} from "gatsby";

export const QUESTION_TYPES = {
    GENERAL: 'general',
    REGIONAL: 'regional'
};

function useQuestions(type, region) {
    const data = useStaticQuery(graphql`
        {
            general: allGeneralQuestionsYaml {
              nodes {
                qid
                metadata {
                    rightAnswer
                    type
                    topic
                    category
                }
                question {
                  text
                }
                answers
                path: gatsbyPath(filePath: "/flashcards/general/{generalQuestionsYaml.qid}")
              }
            }
            regional: allRegionalQuestionsYaml {
              nodes {
                qid
                metadata {
                  rightAnswer
                  region
                  type
                }
                question {
                  text
                }
                answers
                path: gatsbyPath(filePath: "/flashcards/regional/{regionalQuestionsYaml.metadata__region}/{regionalQuestionsYaml.qid}")
              }
            }
        }
    `);
        
    if (type === QUESTION_TYPES.REGIONAL) {
        return data.regional.nodes.filter(question => question.metadata.region.toUpperCase() === region.toUpperCase()); 
    }

    if (type === QUESTION_TYPES.GENERAL) {
        return data.general.nodes;
    }

    return [];
}

export {
    useQuestions
}