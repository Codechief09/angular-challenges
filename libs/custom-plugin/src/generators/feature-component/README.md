<h1>Create a generator for a custom component</h1>

> Author: Thomas Laforge

### Information

Welcome to the marvelous world of Nx generators.

Generators are awesome tools that can help you and your team generate code more quickly, especially for pieces of code that you use frequently. Inside an entreprise project, you often have to create components that look similar. And most of the time, you end up copy/pasting other components. In Nx, you can create this boilerplate in a simple command using generators.

### Statement

The goal of this challenge is to create a generator that will create all the boilerplate of a component for you.

Just below, you will have the end result of your generator for a `UserComponent` associated with a `@ngrx/component-store`.

#### Options

- name : name of your component/store/service
- createService: flag to tell if a http service should be created
  - yes : create as below
  - no: don't create the inject/import/effect/function call (anything related to the service call)
- inlineTemplate: flag to decide if template should be inline or in a separate file

---

`user.component.ts`

```ts
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LetDirective],
  providers: [provideComponentStore(UserStore)],
  template: ` <ng-container *ngrxLet="vm$ as vm"> // do things </ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private userStore = inject(UserStore);

  readonly vm$ = this.userStore.vm$;
}
```

---

`user.store.json`

```ts
import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStateInit, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { mergeMap, pipe, tap } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

export interface UserState {
  users: User[];
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: undefined,
};

@Injectable()
export class UserStore extends ComponentStore<UserState> implements OnStateInit, OnStoreInit {
  private userService = inject(UserService);

  private readonly users$ = this.select((state) => state.users);
  private readonly loading$ = this.select((state) => state.loading);
  private readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select(
    {
      users: this.users$,
      loading: this.loading$,
      error: this.error$,
    },
    { debounce: true }
  );

  ngrxOnStateInit() {
    this.setState(initialState);
  }

  ngrxOnStoreInit() {
    this.loadUsers();
  }

  readonly loadUsers = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true })),
      mergeMap(() =>
        this.userService.loadUsers().pipe(
          tapResponse(
            (users) => this.patchState({ users, loading: false }),
            (err: string) => this.patchState({ error: err, loading: false })
          )
        )
      )
    )
  );
}
```

---

`user.service.ts`

```ts
import { BASE_URL } from '@angular-challenges/fake-utils';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private BASE_URL = inject(BASE_URL);

  loadUsers = () => this.http.get<User[]>(`${this.BASE_URL}/users`);
}
```

---

`user.model.ts`

```ts
export interface User {
  name: string;
}
```

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. _...work on it_
5. Commit your work
6. Submit a PR with a title beginning with **Answer:26** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A26+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="component generator"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A26+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="component generator solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="extends-lib blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../../../../logo/twitter.svg" height=20px alt="twitter"/></a>
