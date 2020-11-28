import regions from './resources/data/regions.yml'

const regionShortNames = regions.list.map(region => region.short);

function isLegalRegion(region) {
    return regionShortNames.includes(region);
}

function getRegionPrettyName(regionShortName) {
    return regions.map[regionShortName];
}

export {
    regionShortNames, 
    isLegalRegion,
    getRegionPrettyName
};