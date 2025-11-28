import React, { Component } from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import MapPlaceholder from './MapPlaceholder';

interface SafeMapViewState {
  hasError: boolean;
}

class SafeMapView extends Component<MapViewProps, SafeMapViewState> {
  constructor(props: MapViewProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('Map Error:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <MapPlaceholder height={(this.props.style as any)?.height || 250} />;
    }

    try {
      return <MapView {...this.props} />;
    } catch (error) {
      console.log('Map Render Error:', error);
      return <MapPlaceholder height={(this.props.style as any)?.height || 250} />;
    }
  }
}

export default SafeMapView;
