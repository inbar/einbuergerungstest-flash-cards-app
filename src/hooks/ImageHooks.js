import {graphql, useStaticQuery} from "gatsby";

function useImages() {
    const data = useStaticQuery(graphql`
    {
      regional: allFile(filter: {extension: {eq: "png"}, relativeDirectory: {glob: "regional/*"}}) {
        nodes {
          name
          relativeDirectory
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      general: allFile(filter: {extension: {eq: "png"}, relativeDirectory: {glob: "general"}}) {
        nodes {
          name
          relativeDirectory
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);
    return data;
}

function useImage(questionId, regionName) {
    const images = useImages();
    
    if (regionName !== undefined) {
        const filteredFiles = images.regional.nodes
            .filter(node => isNodeInRegion(node, regionName) && isNodeForThisQuestion(node, questionId));

        if (filteredFiles === undefined || filteredFiles.length < 1) {
            return undefined;
        }
        
        return filteredFiles[0].childImageSharp;
    }


    const filteredFiles = images.general.nodes
        .filter(node => isNodeForThisQuestion(node, questionId));

    if (filteredFiles === undefined || filteredFiles.length < 1) {
        return undefined;
    }

    return filteredFiles[0].childImageSharp;
}

function isNodeInRegion(node, regionName) {
    return strContains(node.relativeDirectory.toUpperCase(), regionName.toUpperCase())
}

function isNodeForThisQuestion(node, questionId) {
    return node.name === toImageFileName(questionId)
}

function strContains(str, subStr) {
    return str.indexOf(subStr) !== -1;
}

function toImageFileName(questionId) {
    return `Q_${questionId}`;
}

export {
    useImages,
    useImage
}