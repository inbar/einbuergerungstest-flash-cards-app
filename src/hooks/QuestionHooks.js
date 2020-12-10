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
                }
                question {
                  text
                }
                answers
              }
            }
            regional: allRegionalQuestionsYaml {
              nodes {
                qid
                metadata {
                  rightAnswer
                  region
                }
                question {
                  text
                }
                answers
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

function useQuestion(qid, type, region) {
    const questions = useQuestions(type, region);
    // Convert both qid to string
    return questions.find(question => `${question.qid}` ===`${qid}`);
}

export {
    useQuestion,
    useQuestions
}