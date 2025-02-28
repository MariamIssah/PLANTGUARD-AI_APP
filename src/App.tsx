import React from 'react';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { leaf, camera, calendar } from 'ionicons/icons';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import PlantList from './pages/PlantList';
import Diagnose from './pages/Diagnose';
import Calendar from './pages/Calendar';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/plants" component={PlantList} />
            <Route exact path="/diagnose" component={Diagnose} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/">
              <Redirect to="/plants" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="plants" href="/plants">
              <IonIcon icon={leaf} />
              <IonLabel>Plants</IonLabel>
            </IonTabButton>

            <IonTabButton tab="diagnose" href="/diagnose">
              <IonIcon icon={camera} />
              <IonLabel>Diagnose</IonLabel>
            </IonTabButton>

            <IonTabButton tab="calendar" href="/calendar">
              <IonIcon icon={calendar} />
              <IonLabel>Calendar</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App; 