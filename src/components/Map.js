
// import React from 'react';
// import {GoogleMap, Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
 

// class Map extends React.Component {

//     Map = () => {
//         return(
//             <GoogleMap defaultZoom={10} defaultCenter{{lat: 12, lng: 12}} />;
//         );
        
//     }
//     render() {
//       return (
//         <Map google={this.props.google} zoom={14}>
   
//           <Marker onClick={this.onMarkerClick}
//                   name={'Current location'} />
   
//           <InfoWindow onClose={this.onInfoWindowClose}>
//               <div>
//                 <h1>{this.state.selectedPlace.name}</h1>
//               </div>
//           </InfoWindow>
//         </Map>
//       );
//     }
//   }

//   export default GoogleApiWrapper({
//     apiKey: (AIzaSyDl09gfoZHVjpCD0Yd7j7TW0tQdd0vyjqw)
//   })(Map)