import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonBadge,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { add, leaf, warning } from 'ionicons/icons';
import './PlantList.css';

const PlantList: React.FC = () => {
  // Simple list of plants
  const plants = [
    { id: 1, name: 'Tomato Plant', status: 'Healthy' },
    { id: 2, name: 'Basil', status: 'Needs Water' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Plants</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {plants.map(plant => (
            <IonItem key={plant.id}>
              <IonIcon icon={leaf} slot="start" 
                color={plant.status === 'Healthy' ? 'success' : 'warning'} 
              />
              <IonLabel>
                <h2>{plant.name}</h2>
                <p>{plant.status}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Add Plant Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default PlantList; 