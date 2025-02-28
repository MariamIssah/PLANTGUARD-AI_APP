import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';

const Calendar: React.FC = () => {
  const events = [
    { id: 1, title: 'Water Plants', date: 'Today' },
    { id: 2, title: 'Check Tomatoes', date: 'Tomorrow' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {events.map(event => (
            <IonItem key={event.id}>
              <IonLabel>
                <h2>{event.title}</h2>
                <p>{event.date}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Calendar; 