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

export {
    useImages
}