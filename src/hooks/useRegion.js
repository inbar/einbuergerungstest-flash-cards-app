import useRegions from "./useRegions";

export default function useRegion(region) {
    const regions = useRegions();
    return regions.find(r => r.region.toLowerCase() === region.toLowerCase())
}