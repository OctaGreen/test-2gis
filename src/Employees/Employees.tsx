import React from 'react';
import { BehaviorSubject, debounceTime, filter, from, Subscription, switchMap, tap } from 'rxjs';
import { AppButton } from '../AppComponents/AppButton/AppButton';
import { AppSearch } from '../AppComponents/AppSearch/AppSearch';
import { Employee } from './Employee/Employee';
import './Employees.css';

export interface Person {
    image_ref: string;
    name: string;
    midname: string;
    surname: string;
    sex?: number;
    birthdate?: string;
    status?: number;
    department?: string;
    position?: string;
}

const persons: Person[] = [
    {
        image_ref: './media/filler.jpg',
        name: 'Иван',
        midname: 'Петрович',
        surname: 'Соколов'
    },
    {
        image_ref: './media/filler2.jpg',
        name: 'Владимир',
        midname: 'Иванович',
        surname: 'Зайцев'
    },
    {
        image_ref: './media/filler3.jpg',
        name: 'Алиса',
        midname: 'Николаевна',
        surname: 'Синицина'
    },
    {
        image_ref: './media/filler4.jpg',
        name: 'Ольга',
        midname: 'Васильевна',
        surname: 'Лисицина'
    },
    {
        image_ref: './media/filler5.jpg',
        name: 'Евгений',
        midname: 'Борисович',
        surname: 'Медведев'
    },
    {
        image_ref: './media/filler6.jpg',
        name: 'Светлана',
        midname: 'Дмитриевна',
        surname: 'Щукина'
    },
    {
        image_ref: './media/filler7.jpg',
        name: 'Николай',
        midname: 'Николаевич',
        surname: 'Рысь'
    },
    {
        image_ref: './media/filler8.jpg',
        name: 'Василиса',
        midname: 'Александровна',
        surname: 'Ежова'
    },
    {
        image_ref: './media/filler9.jpg',
        name: 'Юрий',
        midname: 'Антонович',
        surname: 'Лебедев'
    },
    {
        image_ref: './media/filler10.jpg',
        name: 'Анна',
        midname: 'Григорьевна',
        surname: 'Журавлева'
    }
];

type Empty = Record<string, never>;

type EmployeesState = {
    people: Person[];
    page: number;
    itemsPerPage: number;
};

export class Employees extends React.Component<Empty, EmployeesState> {
    state = { people: [], page: 1, itemsPerPage: 3 };
    search$ = new BehaviorSubject('');
    page$ = new BehaviorSubject(1);
    private subscription!: Subscription;

    componentDidMount(): void {
        this.subscription = this.search$
            .pipe(
                debounceTime(500),
                tap(() => this.page$.next(this.state.page)),
                switchMap(() => this.page$),
                switchMap((page: number) =>
                    from(this.emulateRequest(this.search$.getValue(), page, this.state.itemsPerPage))
                ),
                filter((value: Person[]) => Boolean(value.length))
            )
            .subscribe((value: Person[]) => {
                this.setState({ ...this.state, people: value, page: this.page$.getValue() });
            });
    }

    componentWillUnmount(): void {
        this.subscription?.unsubscribe();
    }

    render(): JSX.Element {
        return (
            <div className="employees">
                <div className="employees__search">
                    <AppSearch onChange={(value: string) => this.search$.next(value)} />
                </div>
                <div className="employees__list">
                    {this.state.people.map((value: Person, index: number) => (
                        <Employee key={index} employee={value} />
                    ))}
                </div>
                <div className="employees__pagination">
                    <AppButton
                        content={<i className="arrow left"></i>}
                        onClick={() => this.page$.next(this.state.page - 1)}
                    />
                    <AppButton
                        content={<i className="arrow right"></i>}
                        onClick={() => this.page$.next(this.state.page + 1)}
                    />
                </div>
            </div>
        );
    }

    private emulateRequest(str = '', page = 1, itemsPerPage = 3): Promise<Person[]> {
        return new Promise((response) => {
            setTimeout(() => response(this.paginate(page, itemsPerPage, this.searchPeople(str, persons))), 700);
        });
    }

    private searchPeople(str: string, array: Person[]): Person[] {
        return array.filter(
            (person: Person) =>
                !str ||
                person.name.toLowerCase().includes(str.toLowerCase()) ||
                person.midname.toLowerCase().includes(str.toLowerCase()) ||
                person.surname.toLowerCase().includes(str.toLowerCase())
        );
    }

    private paginate(page: number, offset: number, array: Person[]): Person[] {
        const end: number = (page + 1) * offset - offset;
        const start: number = end - offset;
        return array.slice(start, end);
    }
}
