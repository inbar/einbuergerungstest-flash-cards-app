import {graphql, useStaticQuery} from "gatsby";

export default function useMetadata() {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    name
                    url 
                }
            }
        }
    `);

    return data.site.siteMetadata;
}