import {graphql, useStaticQuery} from "gatsby";

const REGION_NAMES = {
    BB: "Brandenburg",
    BE: "Berlin",
    BW: "Baden-Württemberg",
    BY: "Bayern",
    HB: "Bremen",
    HE: "Hessen",
    HH: "Hamburg",
    MV: "Mecklenburg-Vorpommern",
    NI: "Niedersachsen",
    NW: "Nordrhein-Westfalen",
    RP: "Rheinland-Pfalz",
    SH: "Schleswig-Holstein",
    SL: "Saarland",
    SN: "Sachsen",
    ST: "Sachsen-Anhalt",
    TH: "Thüringen"
};

export function getRegionPrettyName(regionShortName) {
    return REGION_NAMES[regionShortName.toUpperCase()];
}

export default function useRegions() {
    const data = useStaticQuery(graphql`
          query regions {
            allRegionsYaml {
                nodes {
                  region
                  regionPathFlashCards: gatsbyPath(filePath: "/flashcards/regional/{regionsYaml.region}")
                  regionPathTest: gatsbyPath(filePath: "/test/{regionsYaml.region}")
              }
            }
          }`);


    return data.allRegionsYaml.nodes.map(region => ({
        ...region,
        readableName: getRegionPrettyName(region.region)
    }));
}