"use client"
import React from 'react'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';


const GoogleMaps = () => {


    const position = { lat: 39.633128, lng: 24.4731647 }

    return (
        <>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} >
                <div>
                    <Map
                        style={{ width: '100%', height: '400px' }}
                        center={position} // Corrected format
                        zoom={9}
                    // defaultZoom={3}
                    // gestureHandling={'greedy'}
                    // disableDefaultUI={true}
                    >
                        <AdvancedMarker position={position} ></AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>
        </>
    );
}

export default GoogleMaps;
