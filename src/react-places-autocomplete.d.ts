declare module 'react-places-autocomplete' {
    import * as React from 'react';
    
    export interface Suggestion {
      description: string;
      place_id: string;
    }
  
    export interface PlacesAutocompleteProps {
      value: string;
      onChange: (value: string) => void;
      onSelect: (address: string) => void;
      searchOptions?: google.maps.places.AutocompleteOptions;
    }
  
    export default class PlacesAutocomplete extends React.Component<PlacesAutocompleteProps> {
      getInputProps: (props: any) => any;
      getSuggestionItemProps: (suggestion: Suggestion) => any;
      suggestions: Suggestion[];
    }
  
    export function geocodeByAddress(address: string): Promise<google.maps.GeocoderResult[]>;
    export function getLatLng(result: google.maps.GeocoderResult): Promise<google.maps.LatLngLiteral>;
  }
  