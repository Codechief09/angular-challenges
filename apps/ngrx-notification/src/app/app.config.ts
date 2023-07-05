import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TeacherEffects } from './teacher/store/teacher.effects';
import { StudentEffects } from './student/store/student.effects';
import { provideRouter } from '@angular/router';
import { ROUTES } from './routes';
import { APP_INITIALIZER, inject } from '@angular/core';
import { FakeBackendService } from '@angular-challenges/ngrx-notification/backend';
import { NotificationService } from './data-access/notification.service';
import {
  teacherReducer,
  teachersFeatureKey,
} from './teacher/store/teacher.reducer';
import {
  studentReducer,
  studentsFeatureKey,
} from './student/store/student.reducer';

const REDUCERS = {
  [teachersFeatureKey]: teacherReducer,
  [studentsFeatureKey]: studentReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(REDUCERS),
    provideEffects([TeacherEffects, StudentEffects]),
    provideRouter(ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(FakeBackendService);
        return () => service.start();
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(NotificationService);
        return () => service.init();
      },
    },
  ],
};
