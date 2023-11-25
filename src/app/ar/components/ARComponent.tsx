import { useEffect } from 'react';

const ARComponent: React.FC = () => {
  useEffect(() => {
    // Inisialisasi A-Frame dan AR.js
    const scene = document.createElement('a-scene');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('arjs', 'sourceType: webcam; videoTexture: true; debugUIEnabled: false');
    scene.setAttribute('renderer', 'antialias: true; alpha: true');
    document.body.appendChild(scene);

    // Menambahkan kamera dengan komponen gps-new-camera
    const camera = document.createElement('a-camera');
    camera.setAttribute('gps-new-camera', 'gpsMinDistance: 5');
    scene.appendChild(camera);

    // Menambahkan entitas dengan komponen gps-new-entity-place
    const entity = document.createElement('a-entity');
    entity.setAttribute('material', 'color: red');
    entity.setAttribute('geometry', 'primitive: box');
    entity.setAttribute('gps-new-entity-place', 'latitude: -7.289133; longitude: 112.797007');
    entity.setAttribute('scale', '0.5 0.5 0.5');
    scene.appendChild(entity);
  }, []);

  return <></>; // Komponen React tidak memerlukan rendering
};

export default ARComponent;
