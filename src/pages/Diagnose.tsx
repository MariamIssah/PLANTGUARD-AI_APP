import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  useIonAlert
} from '@ionic/react';
import { camera, images } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import './Diagnose.css';

const Diagnose: React.FC = () => {
  const [photo, setPhoto] = useState<string>();
  const [showResult, setShowResult] = useState(false);
  const [presentAlert] = useIonAlert();

  // Simple function to take a photo
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      setPhoto(image.webPath);
      setShowResult(true);
    } catch (error) {
      presentAlert({
        header: 'Camera Error',
        message: 'Please make sure we can access your camera',
        buttons: ['OK']
      });
    }
  };

  // Simple function to pick from gallery
  const pickImage = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraResultType.Photos
      });
      
      setPhoto(image.webPath);
      setShowResult(true);
    } catch (error) {
      presentAlert({
        header: 'Gallery Error',
        message: 'Please make sure we can access your photos',
        buttons: ['OK']
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Check Plant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Photo Preview */}
        {photo && (
          <div className="photo-preview">
            <img src={photo} alt="Plant" />
          </div>
        )}

        {/* Camera Buttons */}
        <div className="camera-buttons">
          <IonButton expand="block" onClick={takePhoto}>
            <IonIcon slot="start" icon={camera} />
            Take Photo
          </IonButton>
          
          <IonButton expand="block" color="secondary" onClick={pickImage}>
            <IonIcon slot="start" icon={images} />
            Choose from Gallery
          </IonButton>
        </div>

        {/* Simple Results */}
        {showResult && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Quick Check Results</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="success">
                <h2>Plant appears healthy</h2>
              </IonText>
              <p>Tips to keep your plant healthy:</p>
              <ul>
                <li>Water regularly</li>
                <li>Ensure good sunlight</li>
                <li>Check for pests weekly</li>
              </ul>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Diagnose; 