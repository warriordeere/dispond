import { LngLatLike } from "@tomtom-international/web-sdk-maps"

export interface ttSearchboxResult extends ReverseGeocodeResult {
    type: string,
    id: string,
    score: number,
    position: LngLatLike
    viewport: {
        topLeftPoint: LngLatLike
        btmRightPoint: LngLatLike
    }
    __resultListIdx__: number
}

export interface ReverseGeocodeResult {
    address: {
        streetName: string,
        municipalitySubdivision: string,
        municipality: string,
        countrySecondarySubdivision: string,
        countrySubdivision: string,
        countrySubdivisionName: string,
        countrySubdivisionCode: string,
        postalCode: number,
        countryCode: string,
        country: string,
        countryCodeISO3: string,
        freeformAddress: string,
        localName: string
    }
}

export interface GeometryData {
    type: 'FeatureCollection'
    features: FeatureArray[]
}

export interface FeatureArray {
    type: 'Feature'
    geometry: {
        type: 'Polygon' | 'LineString'
        coordinates: number[][][]
    }
    properties: any
}